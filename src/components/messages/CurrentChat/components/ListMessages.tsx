"use client"

import { type ReactNode, memo, useMemo, useRef, useEffect } from "react"

import type { IResponseMessage } from "@/services/messages/types"

import { ItemTime } from "./ItemTime"
import { NoticeBarter } from "./NoticeBarter"
import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"
import { ComponentLoadingThread } from "@/components/common/Loading"

import { useAuth } from "@/store"
import { NoticeOfferPay } from "./NoticeOfferPay"
import { EnumProviderThreads } from "@/types/enum"
import { IUserOffer } from "@/services/offers/types"
import { IResponseThread } from "@/services/threads/types"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"

export const ListMessages = memo(function ListMessages({
  messages,
  user,
  isLoading,
  thread,
}: {
  messages: IResponseMessage[]
  user: IUserOffer
  isLoading: boolean
  thread: IResponseThread
}) {
  const { join } = useJoinMessage()
  const userId = useAuth(({ userId }) => userId)
  const ulChat = useRef<HTMLUListElement>(null)
  const numberIdMessage = useRef<number | null>(null)

  const messagesJoin: ReactNode = useMemo(() => {
    if (Array.isArray(messages)) {
      return join(messages).map((item) => {
        if (Number(item.emitter?.id) === Number(userId) && item.type === "messages") {
          return (
            <ItemMyMessage key={`${item.id}-message-${item.id}`} photo={item?.emitter?.image?.attributes?.url!} messages={item.messages!} />
          )
        }
        if (Number(item.emitter?.id) === Number(user?.id) && item.type === "messages") {
          return (
            <ItemUserMessage
              key={`${item?.id}-message-${item.id}`}
              photo={item?.emitter?.image?.attributes?.url!}
              messages={item.messages!}
            />
          )
        }
        if (item.type === "time") {
          return <ItemTime time={item.time!} key={`${item.time}-time-block`} />
        }
        return null
      })
    }
    return null
  }, [user?.id, messages, userId])

  useEffect(() => {
    setTimeout(() => {
      if (messages?.length > 0) {
        if (ulChat.current) {
          const top = ulChat.current.scrollHeight
          ulChat.current.scroll({
            top: top + 270,
            behavior: "smooth",
          })
        }
      }
    })
  }, [messages, numberIdMessage, messagesJoin])

  return (
    <ul ref={ulChat} data-loading={isLoading}>
      {thread?.provider === EnumProviderThreads.BARTER && thread?.barterId && <NoticeBarter idBarter={thread?.barterId!} user={user} />}
      {thread?.provider === EnumProviderThreads.OFFER_PAY ? <NoticeOfferPay thread={thread} user={user} /> : null}
      {isLoading
        ? [1, 2, 3].map((item) => <ComponentLoadingThread key={`::item::loading::thread::${item}::`} isRight={item % 2 === 0} />)
        : messagesJoin}
    </ul>
  )
})
