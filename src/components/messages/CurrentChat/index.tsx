"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams, useRouter } from "next/navigation"

import type { IPostThreads } from "@/services/threads/types"

import { Glasses } from "@/components/layout/Glasses"
import { PopupMenu } from "./components/PopupMenu"
import { TextAreaSend } from "./components/TextAreaSend"
import { ItemMyMessage } from "./components/ItemMyMessage"
import { ItemUserMessage } from "./components/ItemUserMessage"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { MESSAGES_CHAT } from "./constants"
import { profileService } from "@/services/profile"
import { threadsService } from "@/services/threads"
import { useWebSocket } from "@/context/WebSocketProvider"
import { useAuth, useChat, usePopupMenuChat } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const CurrentChat = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get("user")
    const { imageProfile, userId } = useAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { socket } = useWebSocket()

    const { data, isLoading } = useQuery(["profile", id], () =>
        profileService.getProfileThroughUserId(id!),
    )

    async function getDataThread(emitterId: number, receiverId: number) {
        const { res } = await threadsService.getUserQuery(Number(emitterId))
        return res?.find(
            (item) => item?.receiverIds?.find((id) => id === receiverId),
        )
    }

    async function createThread(emitterId: number, receiverId: number) {
        const data: IPostThreads = {
            title: `${emitterId}:${receiverId}`,
            parentId: 0,
            emitterId: emitterId,
            receiverIds: [receiverId],
            enabled: true,
        }
        const { res } = await threadsService.post(data)

        return res?.id
    }

    async function crateChat() {
        console.log(
            "thread Number(id), Number(userId): ",
            Number(id),
            Number(userId),
        )
        let thread: any = await getDataThread(Number(userId), Number(id))

        if (!thread) {
            thread = await getDataThread(Number(id), Number(userId))
        }

        if (!thread) {
            const idCreate = await createThread(Number(userId), Number(id))

            if (idCreate) {
                const { res } = await threadsService.get(Number(idCreate))
                thread = res
            }
        }

        console.log("thread: ", thread)
        if (thread) {
            socket?.emit(
                "threadMessages",
                {
                    threadId: thread?.id!,
                },
                (message: any) => {
                    console.log("messages!, ", message)
                },
            )
        }
    }

    useEffect(() => {
        if (id && userId) crateChat()
    }, [id, userId])

    useEffect(
        () => () => {
            setIsVisible(false)
        },
        [setIsVisible],
    )

    if (isMobile) {
        return (
            <section className={styles.containerMobile}>
                <div className={styles.mobileHeader}>
                    <div
                        className={cx(styles.button)}
                        onClick={() => {
                            push(`/messages`, undefined)
                        }}
                    >
                        <Image
                            src="/svg/chevron-left.svg"
                            alt="chevron-left"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div className={styles.blockAvatar}>
                        {data?.res?.image?.attributes?.url ? (
                            <NextImageMotion
                                src={data?.res?.image?.attributes?.url}
                                alt="avatar"
                                width={28}
                                height={28}
                                className={styles.avatar}
                            />
                        ) : (
                            <ImageStatic
                                src="/png/default_avatar.png"
                                alt="avatar"
                                width={28}
                                height={28}
                                classNames={[styles.avatar]}
                            />
                        )}
                        <h3>
                            {data?.res?.firstName || ""}{" "}
                            {data?.res?.lastName || ""}
                        </h3>
                    </div>
                    <div
                        className={cx(styles.button, styles.dots)}
                        onClick={() => setIsVisible()}
                    >
                        <Image
                            src="/svg/dots-vertical.svg"
                            alt="dots-vertical"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <ul>
                    {MESSAGES_CHAT({
                        user: data?.res?.image?.attributes?.url!,
                        my_photo: imageProfile?.attributes?.url!,
                    })?.map((item, index) =>
                        item.isMe ? (
                            <ItemMyMessage
                                key={`${index}_message_${item.avatar_url}`}
                                photo={item.avatar_url}
                                message={item.message}
                                time={item.time}
                            />
                        ) : (
                            <ItemUserMessage
                                key={`${index}_message`}
                                photo={item.avatar_url}
                                message={item.message}
                                time={item.time}
                            />
                        ),
                    )}
                </ul>
                <TextAreaSend
                    photo={data?.res?.image?.attributes?.url!}
                    fullName={`${data?.res?.firstName || ""} ${
                        data?.res?.lastName || ""
                    }`}
                    userIdInterlocutor={data?.res?.userId!}
                />
                <Glasses />
                <PopupMenu
                    fullName={`${data?.res?.firstName || "Имя"} ${
                        data?.res?.lastName || "Фамилия"
                    }`}
                    photo={data?.res?.image?.attributes?.url!}
                />
            </section>
        )
    }

    return (
        <section className={cx(styles.container, isMobile && styles.mobile)}>
            <ul>
                {MESSAGES_CHAT({
                    user: data?.res?.image?.attributes?.url!,
                    my_photo: imageProfile?.attributes?.url!,
                })?.map((item, index) =>
                    item.isMe ? (
                        <ItemMyMessage
                            key={`${index}_message_${item.avatar_url}`}
                            photo={item.avatar_url}
                            message={item.message}
                            time={item.time}
                        />
                    ) : (
                        <ItemUserMessage
                            key={`${index}_message`}
                            photo={item.avatar_url}
                            message={item.message}
                            time={item.time}
                        />
                    ),
                )}
            </ul>
            <TextAreaSend
                photo={data?.res?.image?.attributes?.url!}
                fullName={`${data?.res?.firstName || ""} ${
                    data?.res?.lastName || ""
                }`}
                userIdInterlocutor={data?.res?.userId!}
            />
        </section>
    )
}

export const ChatEmpty = () => <section className={styles.container} />
export const Chat = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("user")
    const { currentChatId } = useChat()

    return currentChatId || id ? <CurrentChat /> : <ChatEmpty />
}
