"use client"

import { memo, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

import type { IResponseMessageProps } from "@/services/messages/types"

import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"

import { useAuth } from "@/store/hooks"
import { useMessages } from "@/store/state/useMessages"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"

export const ListMessages = memo(function ListMessages({
    messages,
}: {
    messages: IResponseMessageProps[]
}) {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")
    const idThread = searchParams.get("thread")
    const { join } = useJoinMessage()
    const { imageProfile, userId } = useAuth()
    const { data } = useMessages()
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<number | null>(null)

    useEffect(() => {
        if (messages?.length > 0) {
            requestAnimationFrame(() => {
                if (ulChat.current) {
                    if (numberIdMessage.current !== messages?.at(-1)?.id) {
                        ulChat.current.scrollTop = ulChat.current.scrollHeight
                        numberIdMessage.current = messages?.at(-1)?.id!
                    }
                }
            })
        }
    }, [messages])

    return (
        <ul ref={ulChat}>
            {join(Array.isArray(messages) ? messages : []).map(
                (item, index) => {
                    if (Number(item.emitterId) === Number(userId)) {
                        return (
                            <ItemMyMessage
                                key={`${item.id}_message_${item.id}`}
                                photo={imageProfile?.attributes?.url!}
                                messages={item.messages}
                                time={"10:05"}
                            />
                        )
                    }
                    if (Number(item.emitterId) === Number(idUser!)) {
                        return (
                            <ItemUserMessage
                                key={`${item?.id}_message_${item.id}`}
                                photo={data[idThread!]?.photo!}
                                messages={item.messages}
                                time={"10:05"}
                            />
                        )
                    }
                    return null
                },
            )}
        </ul>
    )
})
