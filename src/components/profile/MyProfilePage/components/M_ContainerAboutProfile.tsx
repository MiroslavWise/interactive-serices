"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import {
    useAuth,
    useUpdateProfile,
    useVisibleBannerNewServices,
} from "@/store/hooks"
import { useAddress, useOut } from "@/helpers"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
    const { isAddresses } = useAddress()
    const { setVisible } = useUpdateProfile()
    const { out } = useOut()
    const { user, imageProfile, createdUser, addresses } = useAuth()
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()

    const geo = useMemo(() => {
        return addresses?.find((item) => item?.addressType === "main") || null
    }, [addresses])

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
                            <ImageStatic
                                src="/png/default_avatar.png"
                                alt="avatar"
                                width={400}
                                height={400}
                                classNames={[styles.photo]}
                            />
                        )}
                        {user ? (
                            <Image
                                className={styles.verified}
                                src="/svg/verified-tick.svg"
                                alt="tick"
                                width={24}
                                height={24}
                            />
                        ) : null}
                    </div>
                    <ul className={styles.blockAchievements}>
                        {ACHIEVEMENTS.map((item) => (
                            <li key={item.assignment + item.src}>
                                <Image
                                    src={item.src}
                                    alt={item.assignment}
                                    width={23}
                                    height={23}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.aboutBlock}>
                    <h4>
                        {user?.firstName} {user?.lastName}
                    </h4>
                    {geo ? (
                        <GeoTagging
                            size={16}
                            fontSize={12}
                            location={geo?.additional}
                        />
                    ) : null}
                    <p className={styles.date}>
                        Присоединился{" "}
                        {createdUser
                            ? dayjs(createdUser).format("DD.MM.YYYY")
                            : null}
                    </p>
                    <p className={styles.about}>{user?.about}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <ButtonFill
                    label="Создать новое"
                    classNames={styles.buttonFill}
                    suffix={
                        <Image
                            src="/svg/plus.svg"
                            alt="plus"
                            width={24}
                            height={24}
                        />
                    }
                    handleClick={() => {
                        if (isAddresses) {
                            setIsVisibleNewServicesBanner(true)
                        }
                    }}
                />
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/edit-primary-gradient.svg"
                    size={20}
                    classNames={styles.buttonCircle}
                    handleClick={() => {
                        setVisible(true)
                    }}
                />
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/log-out-primary-gradient.svg"
                    size={20}
                    classNames={styles.buttonCircle}
                    handleClick={out}
                />
            </div>
        </section>
    )
}
