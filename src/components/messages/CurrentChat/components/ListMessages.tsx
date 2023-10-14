"use client"

import { type ReactNode, memo, useMemo, useRef, useEffect } from "react"

import type { IThreadsMessages } from "@/services/threads/types"

import { ItemTime } from "./ItemTime"
import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"

import { useAuth } from "@/store/hooks"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"
import { IUserResponse } from "@/services/users/types/usersService"

export const ListMessages = memo(function ListMessages({
    messages,
    dataUser,
    height,
}: {
    messages: IThreadsMessages[]
    dataUser: IUserResponse
    height: number | undefined
}) {
    const { join } = useJoinMessage()
    const { imageProfile, userId } = useAuth()
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<number | null>(null)

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
                    Number(item.emitterId) === Number(dataUser?.id!) &&
                    item.type === "messages"
                ) {
                    return (
                        <ItemUserMessage
                            key={`${item?.id}_message_${item.id}`}
                            photo={dataUser?.profile?.image?.attributes?.url!}
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
    }, [dataUser, messages, join, userId, imageProfile?.attributes?.url])

    useEffect(() => {
        requestAnimationFrame(() => {
            if (messages?.length > 0) {
                if (ulChat.current) {
                    if (numberIdMessage.current !== messages?.at(-1)?.id) {
                        const top = ulChat.current.scrollHeight
                        ulChat.current.scroll({ top: top, behavior: "smooth" })
                        numberIdMessage.current = messages?.at(-1)?.id!
                    }
                }
            }
        })
    }, [messages, numberIdMessage])

    return (
        <ul
            ref={ulChat}
            style={{
                paddingTop:
                    typeof height !== "undefined"
                        ? ` calc(22px + ${height}px)`
                        : 22,
            }}
        >
            {messagesJoin}
        </ul>
    )
})
