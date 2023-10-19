"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"

import { TMobileMainInfo } from "./types"
import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { MotionLI } from "@/components/common/Motion"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import { usePush } from "@/helpers/hooks/usePush"
import { ACHIEVEMENTS } from "../MainInfo/constants"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles.module.scss"

export const MobileMainInfo: TMobileMainInfo = ({ user }) => {
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { userId } = useAuth()
    const { handlePush } = usePush()

    const geo: IAddressesResponse | null = useMemo(() => {
        return (
            user?.addresses?.find((item) => item?.addressType === "main") ||
            null
        )
    }, [user?.addresses])

    return (
        <MotionLI classNames={[styles.containerMain]}>
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
                            <ImageStatic
                                classNames={[styles.photo]}
                                src="/png/default_avatar.png"
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        )}
                        {user?.profile?.image?.attributes?.url ? (
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
                        {user?.profile?.firstName || "____"}{" "}
                        {user?.profile?.lastName || "----"}
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
                        {user?.profile?.created
                            ? dayjs(user?.profile?.created).format("DD.MM.YYYY")
                            : null}
                    </p>
                    {user?.profile?.about ? (
                        <p className={styles.about}>{user?.profile?.about}</p>
                    ) : null}
                </div>
            </div>
            <div className={styles.buttons}>
                <ButtonFill
                    label="Добавить в друзья"
                    type="primary"
                    classNames={styles.buttonFill}
                />
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/message-dots-circle-primary.svg"
                    size={20}
                    classNames={styles.buttonCircle}
                    handleClick={() => {
                        if (Number(userId) === Number(user?.id)) {
                            return
                        }
                        handlePush(`/messages?user=${user?.id}`)
                    }}
                />
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/repeat-primary.svg"
                    size={20}
                    classNames={styles.buttonCircle}
                    handleClick={() => {
                        if (Number(userId) === Number(user?.id)) {
                            return
                        }
                        if (userId) {
                            dispatchVisibleBarter({
                                isVisible: true,
                                dataProfile: {
                                    photo: user?.profile?.image?.attributes
                                        ?.url,
                                    fullName: `${
                                        user?.profile?.firstName || "----"
                                    } ${user?.profile?.lastName || "----"}`,
                                    idUser: user?.id!,
                                },
                            })
                        }
                    }}
                />
            </div>
        </MotionLI>
    )
}
