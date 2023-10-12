"use client"

import Image from "next/image"
import { memo, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers/hooks/usePush"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/style.module.scss"

const $ItemListChat: TItemListChat = ({ thread, people }) => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { handleReplace } = usePush()

    const adress: string | null = useMemo(() => {
        return (
            people?.addresses?.find((item) => item?.addressType === "main")
                ?.additional || null
        )
    }, [people])

    function handleCurrentChat() {
        handleReplace(`/messages?thread=${thread.id}`)
    }

    function lastMessage(): string {
        if (thread?.messages?.length > 0) {
            return thread?.messages?.[0]?.message!
                ? thread?.messages?.[0]?.message!
                : ""
        }

        return ""
    }

    return (
        <li
            className={cx(
                styles.containerItemListChat,
                Number(thread.id) === Number(idThread) && styles.active,
                isMobile && styles.mobileLI,
            )}
            onClick={handleCurrentChat}
        >
            <div className={styles.header}>
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
                        <h4>
                            {people?.profile?.firstName || " "}{" "}
                            {people?.profile?.lastName || " "}
                        </h4>
                        {adress ? (
                            <GeoTagging
                                location={adress}
                                size={14}
                                fontSize={12}
                            />
                        ) : null}
                    </div>
                </div>
                <p className={styles.timeAgo}>
                    {timeNowOrBeforeChat(thread?.messages?.[0]?.created!)}
                </p>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{lastMessage()}</p>
            </div>
        </li>
    )
}

export const ItemListChat = memo($ItemListChat)
