"use client"

import Image from "next/image"

import type { TInfoContainerProfile } from "./types"

import { ButtonFill } from "@/components/common/Buttons"
import { ButtonsCircle } from "@/components/common/Buttons"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers/hooks/usePush"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { MOCK_ACHIEVEMENTS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const InfoContainerProfile: TInfoContainerProfile = ({ profile }) => {
    const { userId } = useAuth((_) => ({ userId: _.userId }))
    const { handlePush } = usePush()
    const { dispatchVisibleBarter } = useVisibleModalBarter((_) => ({
        dispatchVisibleBarter: _.dispatchVisibleBarter,
    }))
    return (
        <section className={styles.infoContainerProfile}>
            <div className={styles.avatarAndAchievements}>
                <div className={styles.avatar}>
                    {profile?.photo ? (
                        <NextImageMotion
                            className={styles.photo}
                            alt="avatar"
                            src={profile?.photo}
                            width={94}
                            height={94}
                        />
                    ) : (
                        <ImageStatic
                            src="/png/default_avatar.png"
                            alt="avatar"
                            width={94}
                            height={94}
                            classNames={[styles.photo]}
                        />
                    )}
                    <Image
                        className={styles.verified}
                        src="/svg/verified-tick.svg"
                        alt="tick"
                        width={32}
                        height={32}
                        unoptimized
                    />
                </div>
                <ul className={styles.achievements}>
                    {MOCK_ACHIEVEMENTS.map((item) => (
                        <Image
                            src={item}
                            alt={item}
                            key={item}
                            width={36}
                            height={36}
                        />
                    ))}
                </ul>
            </div>
            <div className={styles.titleAndGeoAndDescription}>
                <div className={styles.nameGeoDescription}>
                    <div className={styles.nameAndGeo}>
                        <h2>{profile?.name}</h2>
                        <GeoTagging location={profile?.geo} />
                    </div>
                    <p className={styles.description}>{profile?.about}</p>
                </div>
                {userId !== profile?.userId ? (
                    <section className={styles.buttons}>
                        <ButtonFill label="Добавить в друзья" small shadow />
                        <ButtonsCircle
                            src="/svg/message-dots-circle.svg"
                            type="primary"
                            onClick={() => {
                                if (userId) {
                                    handlePush(
                                        `/messages?user=${profile.userId}`,
                                    )
                                }
                            }}
                        />
                        <ButtonsCircle
                            src="/svg/repeat-01.svg"
                            type="primary"
                            onClick={() => {
                                if (userId) {
                                    dispatchVisibleBarter({
                                        isVisible: true,
                                        dataProfile: {
                                            photo: profile?.photo,
                                            fullName: profile?.name,
                                            idUser: profile?.userId!,
                                        },
                                    })
                                }
                            }}
                        />
                    </section>
                ) : null}
            </div>
        </section>
    )
}
