"use client"

import Link from "next/link"
import { memo, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"
import { EnumProviderThreads } from "@/types/enum"

import IconRepeat from "@/components/icons/IconRepeat"
import { NextImageMotion } from "@/components/common"

import { dispatchDataUser, useAuth_ } from "@/store"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/style.module.scss"

export const ItemListChat: TItemListChat = memo(({ thread, last }) => {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const idThread = useSearchParams().get("thread")
  const { provider, emitter, receivers, id, messages } = thread ?? {}

  const user = useMemo(() => {
    if (userId === emitter?.id) {
      return receivers[0]
    } else {
      return emitter
    }
  }, [userId, emitter, receivers])

  const lastMessage = useMemo(() => {
    if (!thread?.messages || !thread?.messages?.length || !userId) {
      return null
    }

    const lastMessage = messages?.[0]
    const notRead = !!userId && !lastMessage?.readIds?.includes(userId) && lastMessage?.emitterId !== userId
    const images = lastMessage?.images

    return (
      <div className={styles.blockLastMessage} data-reading={notRead}>
        {notRead ? <span>&#8226;</span> : null}
        {images?.length > 0
          ? images
              ?.slice(0, !!lastMessage?.message ? 2 : 5)
              ?.map((item) => (
                <NextImageMotion key={`::image::message::`} src={item?.attributes?.url!} alt="offer-image" width={44} height={44} />
              ))
          : null}
        {lastMessage?.message ? <p>{lastMessage?.message}</p> : lastMessage?.images?.length > 0 ? <i>Фотографии</i> : null}
      </div>
    )
  }, [messages, userId])

  useEffect(() => {
    if (!!user) {
      if (Number(idThread) === id) {
        dispatchDataUser(user)
      }
    }
  }, [user, idThread, id])

  return (
    <Link
      className={styles.containerItemListChat}
      data-active={Number(thread.id) === Number(idThread)}
      href={{ query: { thread: thread.id } }}
      data-last={last}
    >
      <div className={styles.header} data-barter={thread?.title?.includes("barter")}>
        <time>{timeNowOrBeforeChat(thread?.messages?.length > 0 ? thread?.messages?.[0]?.created! : thread?.created)}</time>
        <div className={styles.titleBlock}>
          <div className={styles.avatar}>
            <NextImageMotion src={user?.image?.attributes?.url!} alt="avatar" width={40} height={40} className={styles.img} />
            <img src="/svg/verified-tick.svg" alt="verified" width={16} height={16} className={styles.verified} />
          </div>
          <div className={styles.nameAndGeo}>
            {provider === EnumProviderThreads.BARTER ? (
              <h4>
                <article>
                  <IconRepeat />
                </article>
                &nbsp;
                {user?.firstName || " "} {user?.lastName || " "}
              </h4>
            ) : [EnumProviderThreads.OFFER_PAY, EnumProviderThreads.PERSONAL].includes(provider!) ? (
              <h4>
                {user?.firstName || " "} {user?.lastName || " "}
              </h4>
            ) : null}
            <span>@{user?.username}</span>
          </div>
        </div>
      </div>
      {lastMessage}
    </Link>
  )
})
