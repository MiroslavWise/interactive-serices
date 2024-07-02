import { useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { IBarterResponse, ISmallDataOfferBarter } from "@/services/barters/types"

import { ButtonLink } from "../../Forward"
import { LoadingProfile } from "../../Loading"
import { BadgeStatus } from "./components/BadgeStatus"
import { IconRevers } from "@/components/icons/IconRevers"
import { ImageCategory, NextImageMotion } from "../../Image"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { dayFormat } from "@/helpers"
import { dispatchInitiatedBarter, useAuth } from "@/store"
import { getOffersCategories, getUserId } from "@/services"

import styles from "./styles/style.module.scss"
import Link from "next/link"

const title: Map<EnumStatusBarter, string> = new Map([
  [EnumStatusBarter.EXECUTED, "Начало обмена"],
  [EnumStatusBarter.COMPLETED, "Закрыт"],
])

export const CardBarter = ({ barter }: { barter: IBarterResponse }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { created, status, threadId, id, updated } = barter ?? {}

  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const idUser = useMemo(() => {
    if (!barter) return null

    return barter?.consigner?.userId === userId ? barter?.initiator?.userId : barter?.consigner?.userId
  }, [barter, userId])

  const { data: dataUser, isLoading: isLoadingUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser }],
    enabled: !!idUser,
  })
  const { data: dataUserMe } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const categoriesBarter = useMemo(() => {
    if (!barter || !dataUserMe?.data) return null

    const start: ISmallDataOfferBarter = barter?.initiator?.userId === userId ? barter?.consigner : barter?.initiator
    const end: ISmallDataOfferBarter = barter?.initiator?.userId === userId ? barter?.initiator : barter?.consigner

    return { start, end } as Record<"start" | "end", ISmallDataOfferBarter>
  }, [dataUserMe, barter, userId])

  const titleCategory = useCallback(
    (id: number) => {
      if (!categories || !categories?.length) return null

      return categories?.find((item) => item?.id === id)?.title!
    },
    [categories],
  )

  return (
    <article className={styles.container} data-status={status}>
      {[EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED].includes(status!) ? (
        <header>
          <span>
            {title.has(status) ? title.get(status) : null}{" "}
            <time dateTime={String(EnumStatusBarter.EXECUTED === status ? created : updated)}>
              {dayFormat(EnumStatusBarter.EXECUTED === status ? created : updated, "dd.MM.yy")}
            </time>
          </span>
          <BadgeStatus status={status} />
        </header>
      ) : null}
      {isLoadingUser ? (
        <LoadingProfile />
      ) : (
        <Link data-profile href={{ pathname: `/customer/${idUser}` }}>
          <div data-avatar>
            <NextImageMotion src={dataUser?.data?.profile?.image?.attributes?.url!} alt="avatar" width={40} height={40} />
          </div>
          <div data-inform>
            <span>
              {dataUser?.data?.profile?.firstName || " "} {dataUser?.data?.profile?.lastName || " "}&nbsp;
              <IconVerifiedTick />
            </span>
          </div>
        </Link>
      )}
      {status === EnumStatusBarter.INITIATED ? (
        <section data-initiated>
          <p>{barter?.initiator?.title || ""}</p>
        </section>
      ) : null}
      {categoriesBarter ? (
        <section data-categories>
          <div data-first>
            <article>
              <div data-icon>
                <ImageCategory id={categoriesBarter?.start?.categoryId} />
              </div>
              <span>{titleCategory(categoriesBarter?.start?.categoryId)}</span>
            </article>
            <IconRevers />
          </div>
          <article data-me>
            <div data-icon>
              <ImageCategory id={categoriesBarter?.end?.categoryId} />
            </div>
            <span>{titleCategory(categoriesBarter?.end?.categoryId)}</span>
            <div data-avatar>
              <NextImageMotion src={dataUserMe?.data?.profile?.image?.attributes?.url!} alt="avatar" width={24} height={24} />
            </div>
          </article>
        </section>
      ) : null}
      {status === EnumStatusBarter.INITIATED ? (
        <ButtonLink
          typeButton="fill-primary"
          label="Ответить"
          href={{
            pathname: "/messages",
            query: !!threadId ? { thread: threadId } : { "barter-id": `${id}-${idUser}` },
          }}
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
        />
      ) : status === EnumStatusBarter.EXECUTED ? (
        <ButtonLink
          typeButton="regular-primary"
          label="Написать"
          href={{
            pathname: "/messages",
            query: !!threadId ? { thread: threadId } : { "barter-id": `${id}-${idUser}` },
          }}
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
        />
      ) : null}
    </article>
  )
}
