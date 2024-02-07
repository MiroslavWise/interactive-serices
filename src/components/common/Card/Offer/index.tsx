"use client"

import dayjs from "dayjs"
import Link from "next/link"
import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TCardOffer } from "./types"

import { BlockTitle } from "./components/BlockTitle"
import { BlockBarter } from "./components/BlockBarter"
import { LoadingProfile } from "@/components/common"

import { getUserId } from "@/services"
import { useAuth, useVisibleExchanges } from "@/store"

import styles from "./style.module.scss"

export const CardOffer: TCardOffer = ({ id, threadId, timestamp, status, initiator, consigner }) => {
  const myUserId = useAuth(({ userId }) => userId)
  const dispatchExchanges = useVisibleExchanges(({ dispatchExchanges }) => dispatchExchanges)

  const idUser = useMemo(() => {
    if (!initiator || !consigner) return null
    return Number(initiator?.userId) === Number(myUserId) ? Number(consigner?.userId) : Number(initiator?.userId)
  }, [consigner, initiator, myUserId])

  const { data: dataUser, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser }],
    refetchOnMount: false,
    enabled: !!idUser,
  })

  return (
    <li className={styles.container}>
      <section className={styles.main}>
        {isLoadUser ? <LoadingProfile /> : <BlockTitle {...dataUser?.res!} />}
        <BlockBarter {...{ consigner, initiator }} />
      </section>
      <footer>
        <time dateTime={dayjs(timestamp!).format("DD-MM-YYYY")}>{dayjs(timestamp!).format("DD.MM.YYYY")}</time>
        {!["completed", "destroyed"]?.includes(status) ? (
          <Link
            href={{
              pathname: "/messages",
              query: !!threadId ? { thread: threadId } : { "barter-id": `${id}-${idUser}` },
            }}
            onClick={(event) => {
              event.stopPropagation()
              if (isMobile) {
                dispatchExchanges({ visible: false })
              }
            }}
          >
            <img src="/svg/message-dots-circle.svg" alt="dots" width={16} height={16} />
          </Link>
        ) : null}
      </footer>
    </li>
  )
}
