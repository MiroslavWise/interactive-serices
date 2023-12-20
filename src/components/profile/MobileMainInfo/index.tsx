"use client"

import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import { TMobileMainInfo } from "./types"
import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { AddFriend } from "../MainInfo/components/AddFriend"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles.module.scss"

export const MobileMainInfo: TMobileMainInfo = ({ user }) => {
    const userId = useAuth(({ userId }) => userId)
    const dispatchVisibleBarter = useVisibleModalBarter(({ dispatchVisibleBarter }) => dispatchVisibleBarter)

    const geo: IAddressesResponse | null = useMemo(() => {
        return user?.addresses?.find((item) => item?.addressType === "main") || null
    }, [user?.addresses])

    return (
        <li className={styles.containerMain}>
            <div className={styles.blockAboutPhoto}>
                <div className={styles.blockPhotoAch}>
                    <div className={styles.avatar}>
                        {user?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                className={styles.photo}
                                src={user?.profile?.image?.attributes?.url}
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        ) : (
                            <ImageStatic className={styles.photo} src="/png/default_avatar.png" alt="avatar" width={94} height={94} />
                        )}
                        {user?.profile?.image?.attributes?.url ? (
                            <Image className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={24} height={24} unoptimized />
                        ) : null}
                    </div>
                </div>
                <div className={styles.aboutBlock}>
                    <h4>
                        {user?.profile?.firstName || "____"} {user?.profile?.lastName || "----"}
                    </h4>
                    {geo ? <GeoTagging size={16} fontSize={12} location={geo?.additional} /> : null}
                    <p className={styles.date}>На Sheira с {user?.created ? dayjs(user?.profile?.created).format("DD.MM.YYYY") : null}</p>
                    {user?.profile?.about ? <p className={styles.about}>{user?.profile?.about}</p> : null}
                </div>
            </div>
            {userId !== user?.id && !!userId ? (
                <div className={styles.buttons}>
                    <AddFriend user={user} />
                    <Link
                        data-circle-gradient
                        href={Number(userId) === Number(user?.id) ? {} : { pathname: `/messages`, query: { user: user?.id } }}
                    >
                        <img src="/svg/message-dots-circle-primary.svg" alt="message-dots-circle" width={20} height={20} />
                    </Link>
                    <button
                        data-circle-gradient
                        onClick={() => {
                            if (Number(userId) === Number(user?.id) || !userId) {
                                return
                            }
                            if (userId) {
                                dispatchVisibleBarter({
                                    isVisible: true,
                                    dataProfile: {
                                        photo: user?.profile?.image?.attributes?.url,
                                        fullName: `${user?.profile?.firstName || ""} ${user?.profile?.lastName || ""}`,
                                        idUser: user?.profile?.userId!,
                                    },
                                })
                            }
                        }}
                    >
                        <img src="/svg/repeat-01.svg" alt="repeat::1" width={20} height={20} />
                    </button>
                </div>
            ) : null}
        </li>
    )
}
