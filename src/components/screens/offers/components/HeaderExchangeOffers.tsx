import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { NextImageMotion } from "@/components/common"
import { IconChevron } from "@/components/icons/IconChevron"

import { getBarterUserIdReceiver, getUserId } from "@/services"
import { dispatchInitiatedBarter, useAuth } from "@/store"

import styles from "../styles/header-exchange-offers.module.scss"

export const HeaderExchangeOffers = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: !!userId,
  })

  const users = new Set(data?.res?.map((item) => item?.userId) || [])

  const dataUsers = useQueries({
    queries: Array.from(users)
      .slice(0, 5)
      .map((item) => ({
        queryFn: () => getUserId(item!),
        queryKey: ["user", { userId: item }],
        enabled: !!users.size && !!item,
      })),
  })

  const images = useMemo(() => {
    if (dataUsers?.some((some) => !some?.isLoading) && !isLoading) {
      return dataUsers?.map((item) => item?.data?.data?.profile?.image?.attributes?.url!)
    }

    return []
  }, [dataUsers])

  const length = data?.res?.length || 0

  return (
    <section className={styles.container}>
      <div data-header>
        <h3>Предложения обменов</h3>
        <a
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(true)
          }}
        >
          <span>Все ({length})</span>
          {length ? null : <IconChevron />}
        </a>
      </div>
      {length ? (
        <div data-availability>
          <p>
            У вас{" "}
            <a
              onClick={(event) => {
                event.stopPropagation()
                dispatchInitiatedBarter(true)
              }}
            >
              {length} новых
            </a>{" "}
            предложения
          </p>
          <div data-avatars>
            {images.map((item, index) => (
              <div data-avatar={index !== 0} key={`::key::${item}::`}>
                <NextImageMotion src={item!} alt="avatar" width={28} height={28} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>У вас нет новых предложений по обмену</p>
      )}
    </section>
  )
}
