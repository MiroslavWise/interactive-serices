"use client"

import Link from "next/link"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { IResponseMessage } from "@/services/messages/types"

import { PopupMenu } from "../components/PopupMenu"
import { ListMessages } from "../components/ListMessages"
import { TextAreaSend } from "../components/TextAreaSend"
import { ImageStatic, NextImageMotion } from "@/components/common"

import { useWebSocket } from "@/context"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { serviceMessages } from "@/services/messages"
import { useCountMessagesNotReading, usePush } from "@/helpers"
import { useAuth, usePopupMenuChat, dispatchMessagesType, useUserIdMessage, dispatchDataUser } from "@/store/hooks"

import styles from "../styles/style.module.scss"

export const CurrentChat = () => {
    const idThread = useSearchParams()?.get("thread")
    const userId = useAuth(({ userId }) => userId)
    const setIsVisible = usePopupMenuChat(({ setIsVisible }) => setIsVisible)
    const { handleReplace } = usePush()
    const { socket } = useWebSocket() ?? {}
    const [stateMessages, setStateMessages] = useState<(IResponseMessage & { temporary?: boolean })[]>([])
    const { refetchCountMessages } = useCountMessagesNotReading()

    const { data, refetch: refetchThreads } = useQuery({
        queryFn: () => serviceThreads.getId(Number(idThread)),
        queryKey: ["threads", `user=${userId}`, `id=${idThread}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    const { data: dataMessages, refetch } = useQuery({
        queryFn: () => serviceMessages.get({ thread: idThread }),
        queryKey: ["messages", `user=${userId}`, `thread=${idThread}`],
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    useEffect(() => {
        if (data?.res?.enabled === false && data?.ok) {
            handleReplace("/messages")
        }
    }, [data, handleReplace])

    useEffect(() => {
        if (userId && data?.res) {
            const replaceOut = () => {
                return Number(data?.res?.emitterId) === Number(userId) || !!data?.res?.receiverIds?.includes(userId!)
            }
            if (!replaceOut()) {
                handleReplace("/messages")
            }
        }
    }, [userId, data?.res, handleReplace])

    const idUser: number | null = useMemo(() => {
        if (data?.res) {
            return Number(data?.res?.emitterId) === Number(userId) ? Number(data?.res?.receiverIds[0]) : Number(data?.res?.emitterId)
        }

        return null
    }, [data?.res, userId])

    const userDataIdMassage = useUserIdMessage(({ userData }) => userData)

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(Number(idUser)),
        queryKey: ["user", idUser],
        enabled: !!idUser && !userDataIdMassage,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })

    useEffect(() => {
        if (!!dataUser?.ok && !userDataIdMassage) {
            if (dataUser?.res) {
                dispatchDataUser(dataUser?.res)
            }
        }
    }, [dataUser, userDataIdMassage])

    useEffect(() => {
        if (dataMessages?.res && Array.isArray(dataMessages?.res)) {
            setStateMessages(dataMessages?.res!)
        }
    }, [dataMessages?.res])

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
            photo: dataUser?.res?.profile?.image?.attributes?.url! || userDataIdMassage?.profile?.image?.attributes?.url!,
            name: `${dataUser?.res?.profile?.firstName || userDataIdMassage?.profile?.firstName || " "} ${
                dataUser?.res?.profile?.lastName || userDataIdMassage?.profile?.lastName || " "
            }`,
            messages: stateMessages,
        }
    }, [dataUser?.res, userDataIdMassage, stateMessages])

    useEffect(() => {
        function chatResponse(event: any) {
            if (event?.threadId === Number(idThread)) {
                if (event?.receiverIds?.includes(userId!)) {
                    serviceMessages.postRead(event?.id!).then(({ ok }) => {
                        if (ok) {
                            refetch()
                        }
                    })
                } else {
                    refetch()
                }
            }
        }

        socket?.on(`chatResponse-${userId}`, chatResponse)

        return () => {
            socket?.off(`chatResponse-${userId}`, chatResponse)
        }
    }, [socket, refetch, idThread, userId])

    useEffect(() => {
        if (!!data?.res) {
            if (!!data?.res?.barterId) {
                dispatchMessagesType("barter")
            } else {
                dispatchMessagesType("personal")
            }
        }
    }, [data?.res])

    useEffect(() => {
        if (dataMessages?.res && userId && Array.isArray(dataMessages?.res)) {
            const notMyMessages = dataMessages?.res?.filter((item) => item.receiverIds.includes(userId))
            const notReading = notMyMessages?.filter((item) => !item?.readIds?.includes(userId))?.map((item) => item?.id)

            Promise.all(notReading.map((item) => serviceMessages.postRead(item))).then((responses) => {
                console.log("useEffect responses: ", responses)
                setTimeout(() => {
                    refetchCountMessages()
                }, 355)
            })
        }
    }, [userId, dataMessages?.res])

    return (
        <div className={styles.wrapper}>
            {isMobile && (
                <header>
                    <Link data-back href={{ pathname: "/messages" }}>
                        <img src="/svg/chevron-left.svg" alt="chevron-left" width={24} height={24} />
                    </Link>
                    <article>
                        {conversationPartner?.photo ? (
                            <NextImageMotion
                                src={conversationPartner?.photo!}
                                alt="avatar"
                                width={28}
                                height={28}
                                className={styles.avatar}
                            />
                        ) : (
                            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={28} height={28} className={styles.avatar} />
                        )}
                        <h5>{conversationPartner?.name!}</h5>
                    </article>
                    <button onClick={() => setIsVisible()}>
                        <img src="/svg/dots-vertical.svg" alt="dots-vertical" width={24} height={24} />
                    </button>
                </header>
            )}
            <ListMessages
                messages={stateMessages}
                dataUser={dataUser?.res! || userDataIdMassage!}
                idBarter={data?.res?.barterId!}
                refetchThread={refetchThreads}
            />
            <TextAreaSend setStateMessages={setStateMessages} idUser={Number(idUser)} refetch={refetch} />
            {isMobile && <PopupMenu dataUser={dataUser?.res} />}
        </div>
    )
}
