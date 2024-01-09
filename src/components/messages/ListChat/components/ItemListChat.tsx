"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { memo, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { ImageStatic, NextImageMotion, GeoTagging, BadgeServices } from "@/components/common"

import { serviceBarters } from "@/services/barters"
import { dispatchDataUser, useAuth } from "@/store/hooks"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/style.module.scss"

export const ItemListChat: TItemListChat = memo(function ItemListChat({ thread, people, last }) {
    const userId = useAuth(({ userId }) => userId)
    const idThread = useSearchParams().get("thread")
    const { provider, messages } = thread ?? {}
    const {} = people ?? {}

    const idBarter = useMemo(() => (thread?.title?.includes("barter") ? thread?.title?.split(":")?.[1] : null), [thread.title])
    const geo: string | null = useMemo(() => people?.addresses?.find((item) => item?.addressType === "main")?.additional || null, [people])
    const notReadMessage = useMemo(
        () =>
            messages?.filter((item) => item?.receiverIds?.includes(userId!))?.filter((item) => !item?.readIds?.includes(userId!))?.length >
            0,
        [messages, userId],
    )

    const { data: dataBarter } = useQuery({
        queryFn: () => serviceBarters.getId(Number(idBarter)),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const lastMessage = useMemo(() => {
        if (!thread?.messages || !thread?.messages?.length) {
            return null
        }
        return thread?.messages?.at(-1)?.message ? thread?.messages?.at(-1)?.message : ""
    }, [thread?.messages])

    useEffect(() => {
        if (people && idThread && !!thread) {
            if (Number(idThread) === thread.id) {
                dispatchDataUser(people)
            }
        }
    }, [thread, idThread, people])

    return (
        <Link
            className={styles.containerItemListChat}
            data-active={Number(thread.id) === Number(idThread)}
            href={{ query: { thread: thread.id } }}
            data-last={last}
            data-not-read={notReadMessage}
        >
            <div className={styles.header} data-barter={thread?.title?.includes("barter")}>
                {lastMessage ? <time>{timeNowOrBeforeChat(thread?.messages?.[0]?.created!)}</time> : null}
                <div className={styles.titleBlock}>
                    <div className={styles.avatar}>
                        {people?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                src={people?.profile?.image?.attributes?.url!}
                                alt="avatar"
                                width={40}
                                height={40}
                                className={styles.img}
                            />
                        ) : (
                            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={40} height={40} className={styles.img} />
                        )}
                        <img src="/svg/verified-tick.svg" alt="verified" width={16} height={16} className={styles.verified} />
                    </div>
                    <div className={styles.nameAndGeo}>
                        {provider === "barter" ? (
                            <div data-title-barter>
                                <BadgeServices {...dataBarter?.res?.initiator!} />
                                <img data-repeat src="/svg/repeat-white.svg" alt="barter" width={18} height={18} />
                                <BadgeServices {...dataBarter?.res?.consigner!} />
                            </div>
                        ) : provider === "personal" ? (
                            <h4>
                                {people?.profile?.firstName || " "} {people?.profile?.lastName || " "}
                            </h4>
                        ) : null}
                        {geo ? <GeoTagging location={geo} size={14} fontSize={12} /> : null}
                    </div>
                </div>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{lastMessage}</p>
            </div>
        </Link>
    )
})
