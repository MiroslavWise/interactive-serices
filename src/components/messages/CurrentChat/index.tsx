"use client"

import Image from "next/image"
import { useEffect, useInsertionEffect, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { IPostThreads } from "@/services/threads/types"

import { Glasses } from "@/components/layout"
import { PopupMenu } from "./components/PopupMenu"
import { ListMessages } from "./components/ListMessages"
import { TextAreaSend } from "./components/TextAreaSend"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useMessages } from "@/store/state/useMessages"
import { useAuth, usePopupMenuChat } from "@/store/hooks"
import { useSocketMessages } from "@/helpers/hooks/useSocketMessages"

import styles from "./styles/style.module.scss"

export const CurrentChat = () => {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")
    const idThread = searchParams.get("thread")
    const { userId } = useAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { handleReplace } = usePush()
    const { data } = useMessages()
    const { getSocketMessages, getMessages } = useSocketMessages()

    async function getDataThread(emitterId: number, receiverId: number) {
        const { res } = await serviceThreads.getUserId(Number(emitterId))
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
        const { res } = await serviceThreads.post(data_)

        return res?.id
    }

    useInsertionEffect(() => {
        if (idUser && idThread) {
            crateChat().then((response) => {
                console.log("response getDataThread", response)
                handleReplace(
                    `/messages?user=${response
                        ?.receiverIds?.[0]}&thread=${response?.id!}`,
                )
            })
            return
        }
        if (idUser && !idThread) {
            crateChat().then((response) => {
                console.log("response getDataThread", response)
                handleReplace(
                    `/messages?user=${response
                        ?.receiverIds?.[0]}&thread=${response?.id!}`,
                )
            })
            return
        }
    }, [idUser, idThread])

    const crateChat = async () => {
        let thread: any = await getDataThread(Number(userId), Number(idUser))

        console.log("getDataThread: ", thread)

        if (thread) {
            if (Array.isArray(thread?.messages)) {
                getMessages(Number(thread?.id), thread?.messages!)
                return Promise.resolve(thread)
            }
        }

        if (idThread) {
            const { res } = await serviceThreads.getId(Number(idThread))
            thread = res
        }

        if (!thread) {
            console.log("getDataThread: ", thread, "if !thread")
            thread = await getDataThread(Number(idUser), Number(userId))
        }

        if (!thread) {
            const idCreate = await createThread(Number(userId), Number(idUser))

            if (idCreate) {
                const { res } = await serviceThreads.getId(Number(idCreate))
                thread = res
            }
        }
        if (thread) {
            console.log("getDataThread getSocketMessages: ", thread)
            getSocketMessages(thread?.id!)
        }

        return Promise.resolve(thread)
    }

    useEffect(
        () => () => {
            if (isMobile) {
                setIsVisible(false)
            }
        },
        [setIsVisible],
    )

    const conversationPartner = useMemo(() => {
        return {
            photo: data[idThread!]?.photo!,
            name: data[idThread!]?.name!,
            messages: data[idThread!]?.messages!,
        }
    }, [data, idThread])

    if (isMobile) {
        return (
            <section className={styles.containerMobile}>
                <div className={styles.mobileHeader}>
                    <div
                        className={cx(styles.button)}
                        onClick={() => {
                            handleReplace(`/messages`)
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
                        {conversationPartner?.photo ? (
                            <NextImageMotion
                                src={conversationPartner?.photo!}
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
                        <h3>{conversationPartner?.name!}</h3>
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
                <ListMessages messages={conversationPartner?.messages} />
                <TextAreaSend
                    photo={conversationPartner?.photo}
                    fullName={conversationPartner?.name}
                />
                <Glasses />
                <PopupMenu
                    photo={conversationPartner?.photo}
                    fullName={conversationPartner?.name}
                />
            </section>
        )
    }

    return (
        <section className={cx(styles.container)}>
            <ListMessages messages={conversationPartner?.messages} />
            <TextAreaSend
                photo={conversationPartner?.photo}
                fullName={conversationPartner?.name}
            />
        </section>
    )
}

export const ChatEmpty = () => <section className={styles.container} />
export const Chat = () => {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")

    return idUser ? <CurrentChat /> : <ChatEmpty />
}
