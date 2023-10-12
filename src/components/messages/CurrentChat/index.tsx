"use client"

import Image from "next/image"
import { useEffect, useInsertionEffect, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { IPostThreads, IThreadsMessages } from "@/services/threads/types"

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
import { useQuery } from "react-query"
import { serviceUsers } from "@/services/users"

export const CurrentChat = () => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { userId } = useAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { handleReplace } = usePush()

    const { data, refetch } = useQuery({
        queryFn: () => serviceThreads.getId(Number(idThread)),
        queryKey: ["threads", `user=${userId}`, `id=${idThread}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    const idUser: number | null = useMemo(() => {
        if (data?.res) {
            return Number(data?.res?.emitterId) === Number(userId)
                ? Number(data?.res?.receiverIds[0])
                : Number(data?.res?.emitterId)
        }

        return null
    }, [data?.res, userId])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(Number(idUser)),
        queryKey: ["user", idUser],
        enabled: !!idUser,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    const messages: IThreadsMessages[] = useMemo(() => {
        if (data?.res) {
            return data?.res?.messages || []
        }

        return []
    }, [data?.res])

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
            photo: dataUser?.res?.profile?.image?.attributes?.url!,
            name: `${dataUser?.res?.profile?.firstName || " "} ${
                dataUser?.res?.profile?.lastName || " "
            }`,
            messages: messages,
        }
    }, [dataUser?.res, messages])

    console.log("messages: ", messages)

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
                <ListMessages messages={messages} dataUser={dataUser?.res!} />
                <TextAreaSend
                    photo={conversationPartner?.photo}
                    fullName={conversationPartner?.name}
                    idUser={Number(idUser)}
                    refetch={refetch}
                />
                <Glasses />
                <PopupMenu
                    photo={conversationPartner?.photo}
                    fullName={conversationPartner?.name}
                    idUser={Number(idUser)}
                />
            </section>
        )
    }

    return (
        <section className={cx(styles.container)}>
            <ListMessages messages={messages} dataUser={dataUser?.res!} />
            <TextAreaSend
                photo={conversationPartner?.photo}
                fullName={conversationPartner?.name}
                idUser={Number(idUser)}
                refetch={refetch}
            />
        </section>
    )
}

export const ChatEmpty = () => {
    const idUser = useSearchParams().get("user")
    const { userId } = useAuth()
    const { handleReplace } = usePush()

    async function createChat() {
        async function getDataThread(emitterId: number, receiverId: number) {
            const { res } = await serviceThreads.getUserId(Number(emitterId))
            console.log("messages getUserId: ", { res })
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

        if (!idUser) {
            return handleReplace("/messages")
        }
        const idUserReceiver: number = Number(idUser)
        let thread = await getDataThread(idUserReceiver, userId!)

        if (!thread) {
            thread = await getDataThread(userId!, idUserReceiver)
        }
        if (thread) {
            return handleReplace(`/messages?thread=${thread?.id}`)
        }
        if (!thread) {
            const idCreate = await createThread(Number(userId), Number(idUser))

            handleReplace(`/messages?thread=${idCreate}`)
        }
    }

    useInsertionEffect(() => {
        if (!idUser) {
            handleReplace("/messages")
        } else {
            if (userId) {
                createChat()
            }
        }
    }, [idUser, userId])

    return <section className={styles.container} />
}

export const ChatNull = () => <section className={styles.container} />

export const Chat = () => {
    const searchParams = useSearchParams()
    const idUser = searchParams.get("user")
    const isThread = searchParams.get("thread")

    if (idUser) return <ChatEmpty />
    if (isThread) return <CurrentChat />

    return <ChatNull />
}
