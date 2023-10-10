"use client"

import {
    type ReactNode,
    memo,
    useMemo,
    useRef,
    useInsertionEffect,
} from "react"
import { useSearchParams } from "next/navigation"

import type { IThreadsMessages } from "@/services/threads/types"

import { ItemTime } from "./ItemTime"
import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"

import { useAuth } from "@/store/hooks"
import { useMessages } from "@/store/state/useMessages"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"

export const ListMessages = memo(function ListMessages({
    messages,
}: {
    messages: IThreadsMessages[]
}) {
    const searchParams = useSearchParams()
    const idUser = searchParams?.get("user")
    const idThread = searchParams?.get("thread")
    const { join } = useJoinMessage()
    const { imageProfile, userId } = useAuth()
    const { data } = useMessages()
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<number | null>(null)

    useInsertionEffect(() => {
        if (messages?.length > 0) {
            if (ulChat.current) {
                if (numberIdMessage.current !== messages?.at(-1)?.id) {
                    ulChat.current.scrollTop = ulChat.current.scrollHeight
                    numberIdMessage.current = messages?.at(-1)?.id!
                }
            }
        }
    }, [messages])

    const messagesJoin: ReactNode = useMemo(() => {
        if (Array.isArray(messages)) {
            return join(messages).map((item, index) => {
                if (
                    Number(item.emitterId) === Number(userId) &&
                    item.type === "messages"
                ) {
                    return (
                        <ItemMyMessage
                            key={`${item.id}_message_${item.id}`}
                            photo={imageProfile?.attributes?.url!}
                            messages={item.messages!}
                        />
                    )
                }
                if (
                    Number(item.emitterId) === Number(idUser!) &&
                    item.type === "messages"
                ) {
                    return (
                        <ItemUserMessage
                            key={`${item?.id}_message_${item.id}`}
                            photo={data[idThread!]?.photo!}
                            messages={item.messages!}
                        />
                    )
                }
                if (item.type === "time") {
                    return (
                        <ItemTime
                            time={item.time!}
                            key={`${item.time}_time_block`}
                        />
                    )
                }
                return null
            })
        }
        return null
    }, [
        messages,
        data,
        idThread,
        idUser,
        imageProfile?.attributes?.url,
        join,
        userId,
    ])

    return <ul ref={ulChat}>{messagesJoin}</ul>
})
