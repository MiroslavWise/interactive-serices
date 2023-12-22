"use client"

import dayjs from "dayjs"
import Image from "next/image"

import { Button } from "@/components/common"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAddress, useOut } from "@/helpers"
import { useAuth, useUpdateProfile, dispatchNewServicesBanner } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
    const { addressMain } = useAddress()
    const setVisible = useUpdateProfile(({ setVisible }) => setVisible)
    const { out } = useOut()
    const user = useAuth(({ user }) => user)
    const imageProfile = useAuth(({ imageProfile }) => imageProfile)
    const createdUser = useAuth(({ createdUser }) => createdUser)

    return (
        <section className={styles.containerMAboutProfile}>
            <div className={styles.blockAboutPhoto}>
                <div className={styles.blockPhotoAch}>
                    <div className={styles.avatar}>
                        {imageProfile?.attributes?.url ? (
                            <NextImageMotion
                                className={styles.photo}
                                src={imageProfile?.attributes?.url}
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        ) : (
                            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={400} height={400} className={styles.photo} />
                        )}
                        {user ? (
                            <Image className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={24} height={24} unoptimized />
                        ) : null}
                    </div>
                </div>
                <div className={styles.aboutBlock}>
                    <h4>
                        {user?.firstName} {user?.lastName}
                    </h4>
                    {addressMain ? <GeoTagging size={16} fontSize={12} location={addressMain?.additional} /> : null}
                    <p className={styles.date}>На Sheira с {createdUser ? dayjs(createdUser).format("DD.MM.YYYY") : null}</p>
                    <p className={styles.about}>{user?.about}</p>
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
