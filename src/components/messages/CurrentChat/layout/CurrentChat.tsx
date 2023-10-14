"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { useEffect, useMemo, useRef } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { IThreadsMessages } from "@/services/threads/types"

import { Glasses } from "@/components/layout"
import { PopupMenu } from "../components/PopupMenu"
import { ListMessages } from "../components/ListMessages"
import { TextAreaSend } from "../components/TextAreaSend"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { useWebSocket } from "@/context"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { NoticeBarter } from "../components/NoticeBarter"
import { useAuth, usePopupMenuChat } from "@/store/hooks"

import styles from "../styles/style.module.scss"

export const CurrentChat = () => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { userId } = useAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { handleReplace } = usePush()
    const { socket } = useWebSocket() ?? {}

    const { data, refetch } = useQuery({
        queryFn: () => serviceThreads.getId(Number(idThread)),
        queryKey: ["threads", `user=${userId}`, `id=${idThread}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    useEffect(() => {
        if (userId && data?.res) {
            const replaceOut = () => {
                return (
                    Number(data?.res?.emitterId) === Number(userId) ||
                    !!data?.res?.receiverIds?.includes(userId!)
                )
            }
            if (!replaceOut()) {
                handleReplace("/messages")
            }
        }
    }, [userId, data?.res, handleReplace])

    const idUser: number | null = useMemo(() => {
        if (data?.res) {
            return Number(data?.res?.emitterId) === Number(userId)
                ? Number(data?.res?.receiverIds[0])
                : Number(data?.res?.emitterId)
        }

        return null
    }, [data?.res, userId])

    const isBarter = useMemo(() => {
        return !!data?.res?.provider?.includes("barter")
    }, [data?.res])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(Number(idUser)),
        queryKey: ["user", idUser],
        enabled: !!idUser,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
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

    useEffect(() => {
        console.log("socket socket: ", socket)
        function chatResponse(event: any) {
            console.log("chatResponse event: ", event)
            if (event?.threadId === Number(idThread)) {
                refetch()
            }
        }

        socket?.on("chatResponse", chatResponse)

        return () => {
            socket?.off("chatResponse", chatResponse)
        }
    }, [socket, refetch, idThread])

    const height = useMemo(() => {
        if (!isBarter) return 0
        let i = 0
        const header = document.getElementById("id-barter-header")
        requestAnimationFrame(() => {
            i = header?.clientHeight!
        })

        return i
    }, [isBarter])

    console.log("height: ", height)

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
                <ListMessages
                    messages={messages}
                    dataUser={dataUser?.res!}
                    height={height}
                />
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
        <section className={cx(styles.container)} data-barter={isBarter}>
            {isBarter ? (
                <NoticeBarter
                    idBarter={Number(data?.res?.provider?.split(":")?.[1])}
                />
            ) : null}
            <ListMessages
                messages={messages}
                dataUser={dataUser?.res!}
                height={height}
            />
            <TextAreaSend
                photo={conversationPartner?.photo}
                fullName={conversationPartner?.name}
                idUser={Number(idUser)}
                refetch={refetch}
            />
        </section>
    )
}
