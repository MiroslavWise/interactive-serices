"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/common"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useOut } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useAuth, useUpdateProfile, dispatchNewServicesBanner } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
    const setVisible = useUpdateProfile(({ setVisible }) => setVisible)
    const { out } = useOut()
    const userId = useAuth(({ userId }) => userId)

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
    })

    const profile = data?.res?.profile

    const addressMain = data?.res?.addresses?.find((item) => item?.addressType === "main") || null

    return (
        <section className={styles.containerMAboutProfile}>
            <div className={styles.blockAboutPhoto}>
                <div className={styles.blockPhotoAch}>
                    <div className={styles.avatar}>
                        {profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                className={styles.photo}
                                src={profile?.image?.attributes?.url}
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        ) : (
                            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={400} height={400} className={styles.photo} />
                        )}
                        {profile ? (
                            <Image className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={24} height={24} unoptimized />
                        ) : null}
                    </div>
                </div>
                <div className={styles.aboutBlock}>
                    <h4>
                        {profile?.firstName} {profile?.lastName}
                    </h4>
                    {addressMain ? <GeoTagging size={16} fontSize={12} location={addressMain?.additional} /> : null}
                    <p className={styles.date}>На Sheira с {data?.res?.created ? dayjs(data?.res?.created).format("DD.MM.YYYY") : null}</p>
                    <p className={styles.about}>{profile?.about}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button
                    type="button"
                    typeButton="fill-primary"
                    label="Создать"
                    suffixIcon={<img src="/svg/plus.svg" alt="plus" width={24} height={24} />}
                    onClick={() => dispatchNewServicesBanner(true)}
                />
                <button
                    data-circle-gradient
                    onClick={() => {
                        setVisible(true)
                    }}
                >
                    <img src="/svg/edit-primary-gradient.svg" alt="edit-primary" width={20} height={20} />
                </button>
                <button data-circle-gradient onClick={out}>
                    <img src="/svg/log-out-primary-gradient.svg" alt="log-out" width={20} height={20} />
                </button>
            </div>
        </section>
    )
}
