"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { IResponseMessage } from "@/services/messages/types"

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
import { serviceMessages } from "@/services/messages"
import { NoticeBarter } from "../components/NoticeBarter"
import { useAuth, usePopupMenuChat, useMessagesType } from "@/store/hooks"

import styles from "../styles/style.module.scss"

export const CurrentChat = () => {
    const idThread = useSearchParams()?.get("thread")
    const userId = useAuth(({ userId }) => userId)
    const dispatchMessagesType = useMessagesType(
        ({ dispatchMessagesType }) => dispatchMessagesType,
    )
    const setIsVisible = usePopupMenuChat(({ setIsVisible }) => setIsVisible)
    const { handleReplace } = usePush()
    const { socket } = useWebSocket() ?? {}
    const [isLoadingFullInfo, setIsLoadingFullInfo] = useState(false)
    const [screenHeight, setScreenHeight] = useState<string | number>("100%")
    const [stateMessages, setStateMessages] = useState<
        (IResponseMessage & { temporary?: boolean })[]
    >([])

    const { data } = useQuery({
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
        return !!data?.res?.barterId!
    }, [data?.res])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(Number(idUser)),
        queryKey: ["user", idUser],
        enabled: !!idUser,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })

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
            photo: dataUser?.res?.profile?.image?.attributes?.url!,
            name: `${dataUser?.res?.profile?.firstName || " "} ${
                dataUser?.res?.profile?.lastName || " "
            }`,
            messages: stateMessages,
        }
    }, [dataUser?.res, stateMessages])

    useEffect(() => {
        function chatResponse(event: any) {
            if (event?.threadId === Number(idThread)) {
                refetch()
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
                dispatchMessagesType({ type: "barter" })
            } else {
                dispatchMessagesType({ type: "personal" })
            }
        }
    }, [dispatchMessagesType, data?.res])

    useEffect(() => {
        const height = document.documentElement.clientHeight
        setScreenHeight(height || "100%")
    }, [])

    if (isMobile) {
        return (
            <section
                className={cx(styles.containerMobile, "height100vh")}
                style={{ height: screenHeight, paddingTop: isBarter ? 0 : 86 }}
            >
                {isBarter ? (
                    <NoticeBarter
                        idBarter={data?.res?.barterId!}
                        userData={dataUser?.res}
                        setIsLoadingFullInfo={setIsLoadingFullInfo}
                        refetchThread={refetch}
                    />
                ) : (
                    <header data-header>
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
                                unoptimized
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
                                unoptimized
                            />
                        </div>
                    </header>
                )}
                <ListMessages
                    messages={stateMessages}
                    dataUser={dataUser?.res!}
                    isBarter={isBarter}
                    isLoadingFullInfo={isLoadingFullInfo || !isBarter}
                />
                <TextAreaSend
                    photo={conversationPartner?.photo}
                    fullName={conversationPartner?.name}
                    setStateMessages={setStateMessages}
                    idUser={Number(idUser)}
                    refetch={refetch}
                    isBarter={isBarter}
                />
                <Glasses />
                <PopupMenu dataUser={dataUser?.res} isBarter={isBarter} />
            </section>
        )
    }

    return (
        <section className={styles.container} data-barter={isBarter}>
            {isBarter ? (
                <NoticeBarter
                    idBarter={data?.res?.barterId!}
                    userData={dataUser?.res}
                    setIsLoadingFullInfo={setIsLoadingFullInfo}
                    refetchThread={refetch}
                />
            ) : null}
            <ListMessages
                messages={stateMessages}
                dataUser={dataUser?.res!}
                isBarter={isBarter}
                isLoadingFullInfo={isLoadingFullInfo || !isBarter}
            />
            <TextAreaSend
                photo={conversationPartner?.photo}
                fullName={conversationPartner?.name}
                setStateMessages={setStateMessages}
                idUser={Number(idUser)}
                refetch={refetch}
                isBarter={isBarter}
            />
        </section>
    )
}
