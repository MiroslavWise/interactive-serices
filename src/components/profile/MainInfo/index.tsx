"use client"

import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import type { TMainInfo } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { BlockOther } from "./components/BlockOther"
import { AddFriend } from "./components/AddFriend"
import { ComplaintButton } from "./components/ComplaintButton"
import { GeoTagging } from "@/components/common/GeoTagging"
import { CircleOfCommunication } from "./components/CircleOfCommunication"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { SOCIAL_MEDIA } from "./constants"
import { dispatchReciprocalExchange, useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const MainInfo: TMainInfo = ({ user }) => {
    const userId = useAuth(({ userId }) => userId)

    const geo: IAddressesResponse | null = useMemo(() => {
        return user?.addresses?.find((item) => item?.addressType === "main") || null
    }, [user?.addresses])

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {user?.profile?.image?.attributes?.url ? (
                    <NextImageMotion
                        className={styles.photo}
                        src={user?.profile?.image?.attributes?.url!}
                        alt="avatar"
                        width={94}
                        height={94}
                    />
                ) : (
                    <ImageStatic className={styles.photo} src="/png/default_avatar.png" alt="avatar" width={94} height={94} />
                )}
                <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
            </div>
            <div className={styles.content}>
                <div className={styles.information}>
                    <div className={styles.titleAndButtons}>
                        <div className={styles.nameAndGeo}>
                            <h3>
                                {user?.profile?.firstName || "First"} {user?.profile?.lastName || "Last"}
                            </h3>
                            {geo ? <GeoTagging location={geo?.additional} /> : null}
                        </div>
                        {userId !== user?.id && userId ? (
                            <section className={styles.buttons}>
                                <AddFriend user={user} />
                                <Link
                                    data-circle-gradient
                                    href={
                                        Number(userId) === Number(user?.id) || !userId
                                            ? {}
                                            : { pathname: "/messages", query: { user: user?.id } }
                                    }
                                >
                                    <img src="/svg/message-dots-circle-primary.svg" alt="message-dots-circle" width={20} height={20} />
                                </Link>
                                {/* <button
                                    data-circle-gradient
                                    onClick={() => {
                                        if (Number(userId) === Number(user?.id) || !userId) {
                                            return
                                        }
                                        if (userId) {
                                            dispatchReciprocalExchange({ visible: true, profile: user?.profile!, type: "array" })
                                        }
                                    }}
                                >
                                    <img src="/svg/repeat-01.svg" alt="repeat::1" width={20} height={20} />
                                </button> */}
                            </section>
                        ) : null}
                    </div>
                    <div className={styles.descriptionAndOther}>
                        <p className={styles.description}>{user?.profile?.about}</p>
                        <BlockOther label="Социальные медиа" classNames={[styles.social]}>
                            {SOCIAL_MEDIA.map((item) => (
                                <Image
                                    key={item.assignment}
                                    src={item.src}
                                    alt={item.assignment}
                                    width={28}
                                    height={28}
                                    className="cursor-pointer"
                                    unoptimized
                                />
                            ))}
                        </BlockOther>
                        <CircleOfCommunication user={user} />
                    </div>
                </div>
                <div className={styles.statusActive}>
                    <ComplaintButton user={user!} />
                    <div className={styles.dividers} />
                    <p>{user?.created ? dayjs(user?.created).format("DD.MM.YYYY") : null}</p>
                </div>
            </div>
        </div>
    )
}
