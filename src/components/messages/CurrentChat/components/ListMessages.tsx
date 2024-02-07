"use client"

import { flushSync } from "react-dom"
import { type ReactNode, memo, useMemo, useRef, useEffect } from "react"

import type { IResponseMessage } from "@/services/messages/types"
import type { IUserResponse } from "@/services/users/types"

import { ItemTime } from "./ItemTime"
import { NoticeBarter } from "./NoticeBarter"
import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"
import { ComponentLoadingThread } from "@/components/common/Loading"

import { useAuth } from "@/store"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"

export const ListMessages = memo(function ListMessages({
    messages,
    dataUser,
    idBarter,
    isLoading,
}: {
    messages: IResponseMessage[]
    dataUser: IUserResponse
    idBarter: number
    isLoading: boolean
}) {
    const { join } = useJoinMessage()
    const { attributes } = useAuth(({ imageProfile }) => imageProfile) ?? {}
    const userId = useAuth(({ userId }) => userId)
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<number | null>(null)

    const messagesJoin: ReactNode = useMemo(() => {
        if (Array.isArray(messages)) {
            return join(messages).map((item) => {
                if (Number(item.emitterId) === Number(userId) && item.type === "messages") {
                    return <ItemMyMessage key={`${item.id}-message-${item.id}`} photo={attributes?.url!} messages={item.messages!} />
                }
                if (Number(item.emitterId) === Number(dataUser?.id!) && item.type === "messages") {
                    return (
                        <ItemUserMessage key={`${item?.id}-message-${item.id}`} photo={dataUser?.profile?.image?.attributes?.url!} messages={item.messages!} />
                    )
                }
                if (item.type === "time") {
                    return <ItemTime time={item.time!} key={`${item.time}-time-block`} />
                }
                return null
            })
        }
        return null
    }, [dataUser, messages, join, userId, attributes?.url])

    useEffect(() => {
        flushSync(() => {
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
            {!!idBarter && <NoticeBarter idBarter={idBarter!} userData={dataUser} />}
            {isLoading ? [1, 2, 3].map((item) => <ComponentLoadingThread key={`::item::loading::thread::${item}::`} isRight={item % 2 === 0} />) : messagesJoin}
        </ul>
    )
})
