"use client"

import {
    type ReactNode,
    memo,
    useMemo,
    useRef,
    useEffect,
    useState,
} from "react"
import { isMobile } from "react-device-detect"

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
    isBarter,
    isLoadingFullInfo,
}: {
    messages: IThreadsMessages[]
    dataUser: IUserResponse
    isBarter: boolean
    isLoadingFullInfo: boolean
}) {
    const { join } = useJoinMessage()
    const { imageProfile, userId } = useAuth()
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<number | null>(null)
    const [height, setHeight] = useState(0)

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
                    const top = ulChat.current.scrollHeight
                    ulChat.current.scroll({
                        top: top + 200,
                        behavior: "smooth",
                    })
                }
            }
        })
    }, [messages, numberIdMessage, messagesJoin])

    useEffect(() => {
        if (isLoadingFullInfo) {
            requestAnimationFrame(() => {
                const header = document.getElementById("id-barter-header")
                setHeight(header?.clientHeight || 0)
                console.log("%c header: ", "color: #f00", header?.clientHeight)
            })
        }
    }, [isLoadingFullInfo])

    console.log("%c height: ", "color: #ff0", height)

    return (
        <ul
            data-height={isBarter}
            ref={ulChat}
            style={{
                paddingTop: 22,
                paddingBottom: isMobile ? (height ? height + 84 : 168) : 0,
            }}
        >
            {messagesJoin}
        </ul>
    )
})
