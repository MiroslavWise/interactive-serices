"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { IPostThreads } from "@/services/threads/types"

import { Glasses } from "@/components/layout/Glasses"
import { PopupMenu } from "./components/PopupMenu"
import { ListMessages } from "./components/ListMessages"
import { TextAreaSend } from "./components/TextAreaSend"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { threadsService } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useMessages } from "@/store/state/useMessages"
import { useAuth, useChat, usePopupMenuChat } from "@/store/hooks"
import { useSocketMessages } from "@/helpers/hooks/useSocketMessages"

import styles from "./styles/style.module.scss"

export const CurrentChat = () => {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")
    const idThread = searchParams.get("thread")
    const { userId } = useAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { handlePush, handleReplace } = usePush()
    const { data } = useMessages()
    const { getSocketMessages } = useSocketMessages()

    async function getDataThread(emitterId: number, receiverId: number) {
        const { res } = await threadsService.getUserQuery(Number(emitterId))
        return res?.find(
            (item) => item?.receiverIds?.find((id) => id === receiverId),
        )
    }

    async function createThread(emitterId: number, receiverId: number) {
        const data_: IPostThreads = {
            title: `${emitterId}:${receiverId}`,
            parentId: 0,
            emitterId: emitterId,
            receiverIds: [receiverId],
            enabled: true,
        }
        const { res } = await threadsService.post(data_)

        return res?.id
    }

    const crateChat = async () => {
        let thread: any = await getDataThread(Number(userId), Number(idUser))

        if (idThread) {
            const { res } = await threadsService.get(Number(idThread))
            thread = res
        }

        if (!thread) {
            thread = await getDataThread(Number(idUser), Number(userId))
        }

        if (!thread) {
            const idCreate = await createThread(Number(userId), Number(idUser))

            if (idCreate) {
                const { res } = await threadsService.get(Number(idCreate))
                thread = res
            }
        }
        if (thread) {
            console.log("thread: ---------- ", thread)
            getSocketMessages(thread?.id!)
            if (thread?.id !== idThread) {
                if (thread?.receiverIds?.includes(Number(idUser))) {
                    handleReplace(
                        `/messages?user=${thread
                            ?.receiverIds[0]}&thread=${thread?.id!}`,
                    )
                }
            }
        }

        return Promise.resolve(thread)
    }

    useEffect(() => {
        if (idUser && userId) {
            crateChat()
        }
        return () => {}
    }, [idUser, userId])

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
                            handlePush(`/messages`)
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
                        {data[idThread!]?.photo ? (
                            <NextImageMotion
                                src={data[idThread!]?.photo!}
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
                        <h3>{data[idThread!]?.name!}</h3>
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
                <ListMessages messages={data[idThread!]?.messages!} />
                <TextAreaSend
                    photo={data[idThread!]?.photo!}
                    fullName={data[idThread!]?.name!}
                />
                <Glasses />
                <PopupMenu
                    fullName={data[idThread!]?.name!}
                    photo={data[idThread!]?.photo!}
                />
            </section>
        )
    }

    return (
        <section className={cx(styles.container, isMobile && styles.mobile)}>
            <ListMessages messages={data[idThread!]?.messages!} />
            <TextAreaSend
                photo={data[idThread!]?.photo!}
                fullName={data[idThread!]?.name!}
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
