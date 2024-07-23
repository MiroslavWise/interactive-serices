"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TCardOffer } from "./types"

import { BlockTitle } from "./components/BlockTitle"
import { BlockBarter } from "./components/BlockBarter"
import { LoadingProfile } from "@/components/common"

import { getUserId } from "@/services"
import { dayFormat, useResize } from "@/helpers"
import { useAuth, useVisibleExchanges } from "@/store"

import styles from "./style.module.scss"

export const CardOffer: TCardOffer = ({ id, threadId, timestamp, status, initiator, consigner }) => {
  const { id: myUserId } = useAuth(({ auth }) => auth) ?? {}
  const dispatchExchanges = useVisibleExchanges(({ dispatchExchanges }) => dispatchExchanges)
  const { isTablet } = useResize()

  const idUser = useMemo(() => {
    if (!initiator || !consigner) return null
    return Number(initiator?.userId) === Number(myUserId) ? Number(consigner?.userId) : Number(initiator?.userId)
  }, [consigner, initiator, myUserId])

  const { data: dataUser, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser }],
    enabled: !!idUser,
  })

  return (
    <li className={styles.container}>
      <section className={styles.main}>
        {isLoadUser ? <LoadingProfile /> : <BlockTitle {...dataUser?.data!} />}
        <BlockBarter {...{ consigner, initiator }} />
      </section>
      <footer>
        <time dateTime={timestamp as unknown as string}>{dayFormat(timestamp!, "dd.MM.yyyy")}</time>
        {!["completed", "destroyed"]?.includes(status) ? (
          <Link
            href={
              !!threadId
                ? {
                    pathname: `/chat/${threadId}`,
                  }
                : {
                    pathname: `/chat`,
                    query: {
                      "barter-id": `${id}-${idUser}`,
                    },
                  }
            }
            onClick={(event) => {
              event.stopPropagation()
              if (isTablet) {
                dispatchExchanges({ visible: false })
              }
            }}
          >
            <img src="/svg/message-dots-circle-primary.svg" alt="dots" width={16} height={16} />
          </Link>
        ) : null}
      </footer>
    </li>
  )
}
