"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"

import type { TMainInfo } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { BlockOther } from "./components/BlockOther"
import { AddFriend } from "./components/AddFriend"
import { ButtonsCircle } from "@/components/common/Buttons"
import { ComplaintButton } from "./components/ComplaintButton"
import { GeoTagging } from "@/components/common/GeoTagging"
import { CircleOfCommunication } from "./components/CircleOfCommunication"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers/hooks/usePush"
import { SOCIAL_MEDIA } from "./constants"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const MainInfo: TMainInfo = ({ user }) => {
    const { userId } = useAuth((_) => ({ userId: _.userId }))
    const { dispatchVisibleBarter } = useVisibleModalBarter((_) => ({
        dispatchVisibleBarter: _.dispatchVisibleBarter,
    }))
    const { handlePush } = usePush()

    const geo: IAddressesResponse | null = useMemo(() => {
        return (
            user?.addresses?.find((item) => item?.addressType === "main") ||
            null
        )
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
                    <ImageStatic
                        classNames={[styles.photo]}
                        src="/png/default_avatar.png"
                        alt="avatar"
                        width={94}
                        height={94}
                    />
                )}
                <Image
                    className={styles.verified}
                    src="/svg/verified-tick.svg"
                    alt="tick"
                    width={32}
                    height={32}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.information}>
                    <div className={styles.titleAndButtons}>
                        <div className={styles.nameAndGeo}>
                            <h3>
                                {user?.profile?.firstName || "First"}{" "}
                                {user?.profile?.lastName || "Last"}
                            </h3>
                            {geo ? (
                                <GeoTagging location={geo?.additional} />
                            ) : null}
                        </div>
                        {userId !== user?.id && userId ? (
                            <section className={styles.buttons}>
                                <AddFriend user={user} />
                                <ButtonsCircle
                                    src="/svg/message-dots-circle.svg"
                                    type="primary"
                                    onClick={() => {
                                        if (
                                            Number(userId) ===
                                                Number(user?.id) ||
                                            !userId
                                        ) {
                                            return
                                        }
                                        handlePush(`/messages?user=${user?.id}`)
                                    }}
                                />
                                <ButtonsCircle
                                    src="/svg/repeat-01.svg"
                                    type="primary"
                                    onClick={() => {
                                        if (
                                            Number(userId) ===
                                                Number(user?.id) ||
                                            !userId
                                        ) {
                                            return
                                        }
                                        if (userId) {
                                            dispatchVisibleBarter({
                                                isVisible: true,
                                                dataProfile: {
                                                    photo: user?.profile?.image
                                                        ?.attributes?.url,
                                                    fullName: `${
                                                        user?.profile
                                                            ?.firstName || ""
                                                    } ${
                                                        user?.profile
                                                            ?.lastName || ""
                                                    }`,
                                                    idUser: user?.profile
                                                        ?.userId!,
                                                },
                                            })
                                        }
                                    }}
                                />
                            </section>
                        ) : null}
                    </div>
                    <div className={styles.descriptionAndOther}>
                        <p className={styles.description}>
                            {user?.profile?.about}
                        </p>
                        <BlockOther
                            label="Социальные медиа"
                            classNames={[styles.social]}
                        >
                            {SOCIAL_MEDIA.map((item) => (
                                <Image
                                    key={item.assignment}
                                    src={item.src}
                                    alt={item.assignment}
                                    width={28}
                                    height={28}
                                    className="cursor-pointer"
                                />
                            ))}
                        </BlockOther>
                        <CircleOfCommunication user={user} />
                    </div>
                </div>
                <div className={styles.statusActive}>
                    <ComplaintButton user={user!} />
                    <div className={styles.dividers} />
                    <p>
                        {user?.created
                            ? dayjs(user?.created).format("DD.MM.YYYY")
                            : null}
                    </p>
                </div>
            </div>
        </div>
    )
}
