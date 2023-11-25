"use client"

import { useMemo } from "react"
import Image from "next/image"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BadgeInformationProfile = ({}) => {
    const { dataProfile, dataOffer } = useVisibleModalBarter((_) => ({
        dataProfile: _.dataProfile,
        dataOffer: _.dataOffer,
    }))

    const address = useMemo(() => {
        return dataOffer?.addresses?.[0]?.additional || ""
    }, [dataOffer?.addresses])

    return (
        <div className={styles.containerBadgeInformationProfile}>
            <h4>Обмен с:</h4>
            <section>
                <div className={styles.avatar}>
                    {dataProfile?.photo ? (
                        <NextImageMotion
                            src={dataProfile?.photo}
                            alt="avatar"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <ImageStatic
                            src="/png/default_avatar.png"
                            alt="avatar"
                            width={40}
                            height={40}
                        />
                    )}
                    <Image
                        src="/svg/verified-tick.svg"
                        alt="verified"
                        height={16}
                        width={16}
                        className={styles.verified}
                        unoptimized
                    />
                </div>
                <div className={styles.textInformation}>
                    <h5>{dataProfile?.fullName}</h5>
                    <GeoTagging location={address} size={14} fontSize={12} />
                </div>
            </section>
        </div>
    )
}
