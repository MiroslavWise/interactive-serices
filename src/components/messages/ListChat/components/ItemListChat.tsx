"use client"

import { useEffect } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useAuth, useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { usePush } from "@/helpers/hooks/usePush"
import { useMessages } from "@/store/state/useMessages"

import styles from "./styles/style.module.scss"
import dayjs from "dayjs"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

export const ItemListChat: TItemListChat = ({ item }) => {
    const { get } = useSearchParams()
    const { setCurrentChat } = useChat()
    const idThread = get("thread")
    const { handleReplace } = usePush()
    const { setPhotoAndName, data } = useMessages()

    useEffect(() => {
        if (item) {
            const userId = item.receiverIds[0]!
            const id = item?.id!

            if (!data[item?.id]?.name) {
                profileService
                    .getProfileThroughUserId(item.receiverIds[0]!)
                    .then((response) => {
                        const name = `${response?.res?.firstName! || " "} ${
                            response?.res?.lastName! || " "
                        }`
                        const photo = response?.res?.image?.attributes?.url!
                        setPhotoAndName({
                            id: id,
                            userId: userId,
                            photo: photo,
                            name: name,
                        })
                    })
            }
        }
    }, [data, item, setPhotoAndName])

    function handleCurrentChat() {
        handleReplace(
            `/messages?user=${item.receiverIds[0]!}&thread=${item.id}`,
        )
        setCurrentChat(item.id)
    }

    console.log("item: ", item?.messages)

    function lastMessage(): string {
        if (item?.messages?.length > 0) {
            return `${
                Number(item?.messages?.at(-1)?.emitterId) ===
                Number(item?.emitterId)
                    ? "&bull; "
                    : ""
            }${
                item?.messages?.at(-1)?.message!
                    ? item?.messages?.at(-1)?.message!
                    : ""
            }`
        }

        return ""
    }

    return (
        <li
            className={cx(
                styles.containerItemListChat,
                item.id.toString() === idThread?.toString() && styles.active,
                isMobile && styles.mobileLI,
            )}
            onClick={handleCurrentChat}
        >
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <div className={styles.avatar}>
                        {data?.[item?.id]?.photo ? (
                            <NextImageMotion
                                src={data?.[item?.id]?.photo!}
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
                        <h4>{data?.[item?.id]?.name}</h4>
                        <GeoTagging
                            location="Москва, Пролетарская"
                            size={14}
                            fontSize={12}
                        />
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
