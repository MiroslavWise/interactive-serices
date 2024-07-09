"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { type IResponseThreads } from "@/services/threads/types"

import ChatIconProvider from "./ChatIconProvider"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { timeNowOrBeforeChatHours } from "@/lib/timeNowOrBefore"
import { typeMessage, userInterlocutor } from "@/helpers/user-interlocutor"
import { useMemo } from "react"

function ItemMessageChat({ item }: { item: IResponseThreads }) {
  const params = useParams()
  const userId = useAuth(({ auth }) => auth?.id)
  const { id } = (params as { id?: string | number }) ?? {}
  const { provider } = item ?? {}

  const message = item?.messages?.length ? item?.messages?.[0]?.message : null
  const user = userInterlocutor({ m: item.emitter, r: item.receivers, userId: userId! })

  const messageType = typeMessage({ provider: provider, last: message })
  const lastTime = timeNowOrBeforeChatHours(item?.messages?.length > 0 ? item?.messages?.[0]?.created! : item?.created)

  const reading = useMemo(() => {
    if (!item?.messages || item?.messages?.length === 0) return null
    const lastMessage = item?.messages[0]
    if (lastMessage.emitterId === userId) {
      const read = !!lastMessage.readIds.length
      return (
        <div className="w-5 h-4 px-2.5 py-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4"
          >
            {read ? (
              <>
                <path d="M9.5 12.5L18.5 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
                <path d="M2 8.5L5.5 12L14 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
              </>
            ) : (
              <path d="M6 8.5L9.5 12L18 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
            )}
          </svg>
        </div>
      )
    }
    return null
  }, [item, userId])

  return (
    <Link
      key={`::key::chat::${item.id}::`}
      href={{ pathname: `/chat/${item.id}` }}
      className={cx(
        "w-full py-2.5 pl-2.5 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 rounded-[0.625rem] hover:bg-grey-field",
        id && Number(id) === item.id && "!bg-grey-field",
      )}
    >
      <div className="relative w-[3.25rem] h-[3.25rem] p-[1.625rem] bg-grey-stroke-light rounded-full">
        {user && user?.image ? (
          <NextImageMotion
            src={user?.image?.attributes?.url}
            alt="avatar"
            width={40}
            height={40}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.25rem] h-[3.25rem] rounded-[1.625rem] overflow-hidden z-10"
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.95rem] h-[1.95rem]" />
        )}
        <ChatIconProvider provider={provider} />
      </div>
      <article className="w-full flex flex-col items-start justify-center pr-2.5">
        <div className="w-full flex flex-row flex-nowrap items-center justify-between gap-2 ">
          <h4 className="text-text-primary font-medium text-ellipsis line-clamp-1 whitespace-nowrap">
            {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
          </h4>
          <div className="flex flex-nowrap flex-row items-center gap-0.5">
            {reading}
            <time className="text-text-secondary text-[0.8125rem] font-normal whitespace-nowrap">{lastTime}</time>
          </div>
        </div>
        <p className="text-text-primary font-normal text-sm text-left line-clamp-1 text-ellipsis">{messageType}</p>
        <p className="text-text-secondary font-normal text-sm text-left line-clamp-1 text-ellipsis">{message || "Нет сообщений"}</p>
      </article>
    </Link>
  )
}

ItemMessageChat.displayName = "ItemMessageChat"
export default ItemMessageChat
