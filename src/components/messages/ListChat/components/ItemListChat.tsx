"use client"

import Image from "next/image"
import { memo, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { BadgeServices } from "@/components/common/Badge"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { serviceBarters } from "@/services/barters"
import { usePush } from "@/helpers/hooks/usePush"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/style.module.scss"

export const ItemListChat: TItemListChat = memo(function ItemListChat({ thread, people, last }) {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { handleReplace } = usePush()

    const adress: string | null = useMemo(() => {
        return people?.addresses?.find((item) => item?.addressType === "main")?.additional || null
    }, [people])

    const idBarter = useMemo(() => {
        if (!thread?.title) return null

        if (thread?.title?.includes("barter")) {
            return thread?.title?.split(":")?.[1]
        }

        return null
    }, [thread.title])

    const { data: dataBarter } = useQuery({
        queryFn: () => serviceBarters.getId(Number(idBarter)),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    function handleCurrentChat() {
        handleReplace(`/messages?thread=${thread.id}`)
    }

    const lastMessage = useMemo(() => {
        if (!thread?.messages || !thread?.messages?.length) {
            return null
        }
        return thread?.messages?.at(-1)?.message || " "
    }, [thread?.messages])

    return (
        <li
            className={cx(
                styles.containerItemListChat,
                Number(thread.id) === Number(idThread) && styles.active,
                isMobile && styles.mobileLI,
            )}
            onClick={handleCurrentChat}
            data-last={last}
        >
            <div className={styles.header} data-barter={thread?.title?.includes("barter")}>
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
                        <Image src="/svg/verified-tick.svg" alt="verified" width={16} height={16} className={styles.verified} unoptimized />
                    </div>
                    <div className={styles.nameAndGeo}>
                        {thread?.title?.includes("barter") ? (
                            <div data-title-barter>
                                <BadgeServices {...dataBarter?.res?.initiator!} />
                                <Image data-repeat src="   /svg/repeat-white.svg" alt="barter" width={18} height={18} unoptimized />
                                <BadgeServices {...dataBarter?.res?.consigner!} />
                            </div>
                        ) : (
                            <h4>
                                {people?.profile?.firstName || " "} {people?.profile?.lastName || " "}
                            </h4>
                        )}
                        {adress ? <GeoTagging location={adress} size={14} fontSize={12} /> : null}
                    </div>
                </div>
                <div className={styles.timeAgo}>{timeNowOrBeforeChat(thread?.messages?.[0]?.created!)}</div>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{lastMessage}</p>
            </div>
        </li>
    )
})
