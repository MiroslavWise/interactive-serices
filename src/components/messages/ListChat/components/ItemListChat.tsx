"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TItemListChat } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { usePush } from "@/helpers/hooks/usePush"
import { useMessages } from "@/store/state/useMessages"

import styles from "./styles/style.module.scss"

export const ItemListChat: TItemListChat = ({ item }) => {
    const { get } = useSearchParams()
    const { setCurrentChat } = useChat()
    const idThread = get("thread")
    const { handleReplace } = usePush()
    const { setPhotoAndName } = useMessages()
    const { data, isLoading } = useQuery(
        ["profile", item.receiverIds[0]!],
        () => profileService.getProfileThroughUserId(item.receiverIds[0]!),
    )

    useEffect(() => {
        if (data?.ok && data?.res && item) {
            const userId = data?.res?.userId!
            const id = item?.id!
            const name = `${data?.res?.firstName! || " "} ${
                data?.res?.lastName! || " "
            }`
            const photo = data?.res?.image?.attributes?.url!

            setPhotoAndName({
                id: id,
                userId: userId,
                photo: photo,
                name: name,
            })
        }
    }, [data, item, setPhotoAndName])

    function handleCurrentChat() {
        handleReplace(
            `/messages?user=${item.receiverIds[0]!}&thread=${item.id}`,
        )
        setCurrentChat(item.id)
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
                        {data?.res?.image?.attributes.url ? (
                            <NextImageMotion
                                src={data?.res?.image?.attributes.url}
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
                            {data?.res?.firstName} {data?.res?.lastName}
                        </h4>
                        <GeoTagging
                            location="Москва, Пролетарская"
                            size={14}
                            fontSize={12}
                        />
                    </div>
                </div>
                <p className={styles.timeAgo}>5 мин</p>
            </div>
            <div className={styles.blockLastMessage}>
                <p>{data?.res?.about ? data?.res?.about : ""}</p>
            </div>
        </li>
    )
}
