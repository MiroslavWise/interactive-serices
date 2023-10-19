"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { memo, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { MotionLI } from "@/components/common/Motion"
import { BadgeServices } from "@/components/common/Badge"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { serviceBarters } from "@/services/barters"
import { usePush } from "@/helpers/hooks/usePush"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"

const $ItemListChat: TItemListChat = ({ thread, people, last }) => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { handleReplace } = usePush()
    const { categories } = useOffersCategories()

    const adress: string | null = useMemo(() => {
        return (
            people?.addresses?.find((item) => item?.addressType === "main")
                ?.additional || null
        )
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
    })

    const barter = useMemo(() => {
        if (!dataBarter?.res && !categories) return null

        const titleInitiator = categories?.find(
            (item) => item.id === dataBarter?.res?.initiator?.categoryId!,
        )
        const titleConsigner = categories?.find(
            (item) => item.id === dataBarter?.res?.consigner?.categoryId!,
        )

        return {
            initiator: {
                title: titleInitiator?.title,
                type: dataBarter?.res?.initiator?.provider!,
            },
            consigner: {
                title: titleConsigner?.title!,
                type: dataBarter?.res?.consigner?.provider!,
            },
        }
    }, [dataBarter?.res, categories])

    function handleCurrentChat() {
        handleReplace(`/messages?thread=${thread.id}`)
    }

    function lastMessage(): string {
        if (thread?.messages?.length > 0) {
            return thread?.messages?.[0]?.message! || ""
        }

        return ""
    }

    return (
        <MotionLI
            classNames={[
                styles.containerItemListChat,
                Number(thread.id) === Number(idThread) && styles.active,
                isMobile && styles.mobileLI,
            ]}
            onClick={handleCurrentChat}
            data={{
                "data-last": last,
            }}
            notY
        >
            <div
                className={styles.header}
                data-barter={thread?.title?.includes("barter")}
            >
                <div className={styles.titleBlock}>
                    <div className={styles.avatar}>
                        {people?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                src={people?.profile?.image?.attributes?.url!}
                                alt="avatar"
                                width={400}
                                height={400}
                                className={styles.img}
                            />
                        ) : (
                            <ImageStatic
                                src="/png/default_avatar.png"
                                alt="avatar"
                                width={400}
                                height={400}
                                classNames={[styles.img]}
                            />
                        )}
                        <Image
                            src="/svg/verified-tick.svg"
                            alt="verified"
                            width={16}
                            height={16}
                            className={styles.verified}
                        />
                    </div>
                    <div className={styles.nameAndGeo}>
                        {thread?.title?.includes("barter") ? (
                            <div data-title-barter>
                                <BadgeServices
                                    {...dataBarter?.res?.initiator!}
                                />
                                <Image
                                    data-repeat
                                    src="   /svg/repeat-white.svg"
                                    alt="barter"
                                    width={18}
                                    height={18}
                                />
                                <BadgeServices
                                    {...dataBarter?.res?.consigner!}
                                />
                            </div>
                        ) : (
                            <h4>
                                {people?.profile?.firstName || " "}{" "}
                                {people?.profile?.lastName || " "}
                            </h4>
                        )}
                        {adress ? (
                            <GeoTagging
                                location={adress}
                                size={14}
                                fontSize={12}
                            />
                        ) : null}
                    </div>
                </div>
                <div className={styles.timeAgo}>
                    {timeNowOrBeforeChat(thread?.messages?.[0]?.created!)}
                </div>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{lastMessage()}</p>
            </div>
        </MotionLI>
    )
}

export const ItemListChat = memo($ItemListChat)
