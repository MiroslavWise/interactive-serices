"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { memo, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { usePush } from "@/helpers/hooks/usePush"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/style.module.scss"

const $ItemListChat: TItemListChat = ({ item }) => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { handleReplace } = usePush()
    const { userId } = useAuth()

    const idUser: number = useMemo(() => {
        if (Number(item.emitterId) !== Number(userId))
            return Number(item.emitterId)
        return item.receiverIds[0] as number
    }, [item.emitterId, item.receiverIds, userId])

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(idUser),
        queryKey: ["user", idUser],
    })

    const adress: string | null = useMemo(() => {
        return (
            data?.res?.addresses?.find((item) => item?.addressType === "main")
                ?.additional || null
        )
    }, [data?.res])

    function handleCurrentChat() {
        handleReplace(`/messages?thread=${item.id}`)
    }

    function lastMessage(): string {
        if (item?.messages?.length > 0) {
            return item?.messages?.[0]?.message!
                ? item?.messages?.[0]?.message!
                : ""
        }

        return ""
    }

    return (
        <li
            className={cx(
                styles.containerItemListChat,
                Number(item.id) === Number(idThread) && styles.active,
                isMobile && styles.mobileLI,
            )}
            onClick={handleCurrentChat}
        >
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <div className={styles.avatar}>
                        {data?.res?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                src={
                                    data?.res?.profile?.image?.attributes?.url!
                                }
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
                            {data?.res?.profile?.firstName || " "}{" "}
                            {data?.res?.profile?.lastName || " "}
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
                    {timeNowOrBeforeChat(item?.messages?.[0]?.created!)}
                </p>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{lastMessage()}</p>
            </div>
        </li>
    )
}

export const ItemListChat = memo($ItemListChat)
