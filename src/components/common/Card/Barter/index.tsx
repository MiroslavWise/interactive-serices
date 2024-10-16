import Link from "next/link"
import { useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { IBarterResponse, ISmallDataOfferBarter } from "@/services/barters/types"

import { ButtonLink } from "../../Forward"
import { ImageCategory } from "../../Image"
import { LoadingProfile } from "../../Loading"
import { BadgeStatus } from "./components/BadgeStatus"
import { IconRevers } from "@/components/icons/IconRevers"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { dayFormat } from "@/helpers"
import { dispatchInitiatedBarter, useAuth } from "@/store"
import { getOffersCategories, getUserId } from "@/services"

import styles from "./styles/style.module.scss"
import Avatar from "@avatar"

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
  const categories = data?.data || []

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
    <article
      className={cx(
        styles.container,
        "w-full rounded-2xl border border-solid border-grey-stroke-light bg-BG-second flex flex-col gap-3 p-3",
      )}
      data-status={status}
    >
      {[EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED].includes(status!) ? (
        <header className="w-full flex items-center justify-between gap-1">
          <span className="text-text-secondary text-[0.8125rem] left-4 font-normal">
            {title.has(status) ? title.get(status) : null}{" "}
            <time dateTime={String(EnumStatusBarter.EXECUTED === status ? created : updated)} className="text-text-primary">
              {dayFormat(EnumStatusBarter.EXECUTED === status ? created : updated, "dd.MM.yy")}
            </time>
          </span>
          <BadgeStatus status={status} />
        </header>
      ) : null}
      {isLoadingUser ? (
        <LoadingProfile />
      ) : (
        <Link
          data-profile
          href={{ pathname: `/customer/${idUser}` }}
          target="_blank"
          className="w-full grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3"
        >
          <Avatar
            className={cx(
              "w-10 h-10 p-5 rounded-.625",
              !!dataUser?.data?.profile?.image?.attributes?.url ? "bg-BG-first" : "bg-grey-stroke-light",
            )}
            image={dataUser?.data?.profile?.image}
          />
          <div data-inform className="flex flex-col gap-0.5">
            <span className="flex flex-nowrap text-text-primary text-sm font-medium">
              {dataUser?.data?.profile?.firstName || "Имя"} {dataUser?.data?.profile?.lastName ?? ""}&nbsp;
              <div className="relative w-4 h-4 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                <IconVerifiedTick />
              </div>
            </span>
          </div>
        </Link>
      )}
      {status === EnumStatusBarter.INITIATED ? (
        <section data-initiated className="w-full flex flex-col gap-2">
          <p className="text-text-primary text-sm font-normal line-clamp-1 text-ellipsis">{barter?.initiator?.title || ""}</p>
        </section>
      ) : null}
      {categoriesBarter ? (
        <section data-categories className="w-full flex flex-wrap gap-1">
          <div data-first>
            <article>
              <div className="relative bg-BG-icons rounded-full overflow-hidden p-3 w-6 h-6 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                <ImageCategory id={categoriesBarter?.start?.categoryId} />
              </div>
              <span className="text-text-primary text-sm text-ellipsis line-clamp-1 font-normal">
                {titleCategory(categoriesBarter?.start?.categoryId)}
              </span>
            </article>
            <IconRevers />
          </div>
          <article data-me>
            <div className="relative bg-BG-icons rounded-full overflow-hidden p-3 w-6 h-6 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
              <ImageCategory id={categoriesBarter?.end?.categoryId} />
            </div>
            <span className="text-text-primary text-sm text-ellipsis line-clamp-1 font-normal">
              {titleCategory(categoriesBarter?.end?.categoryId)}
            </span>
            <Avatar className="h-6 w-6 rounded-full p-3" image={dataUserMe?.data?.profile?.image} userId={dataUserMe?.data?.id} />
          </article>
        </section>
      ) : null}
      {status === EnumStatusBarter.INITIATED ? (
        <ButtonLink
          typeButton="fill-primary"
          label={threadId || id ? "Написать" : "Предложение удалено"}
          href={
            !!threadId
              ? {
                  pathname: `/chat/${threadId}`,
                }
              : id
              ? {
                  pathname: `/chat`,
                  query: {
                    "barter-id": `${id}-${idUser}`,
                  },
                }
              : {}
          }
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
        />
      ) : status === EnumStatusBarter.EXECUTED ? (
        <ButtonLink
          typeButton="regular-primary"
          label={threadId || id ? "Написать" : "Предложение удалено"}
          href={
            !!threadId
              ? {
                  pathname: `/chat/${threadId}`,
                }
              : id
              ? {
                  pathname: `/chat`,
                  query: {
                    "barter-id": `${id}-${idUser}`,
                  },
                }
              : {}
          }
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
        />
      ) : null}
    </article>
  )
}
