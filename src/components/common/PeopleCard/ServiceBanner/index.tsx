import Image from "next/image"

import type { TPeopleCard } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { BadgeServices } from "@/components/common/Badge"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import styles from "./style.module.scss"
import { memo } from "react"

const $PeopleCard: TPeopleCard = ({ photo, name, geo, rate, services, setDataProfile, about, userId, offer }) => {
    const handleClick = () => {
        if (setDataProfile) {
            setDataProfile({
                dataProfile: {
                    name: name,
                    geo: geo,
                    photo: photo,
                    about: about,
                    userId: userId,
                },
                isService: false,
                isProfile: true,
            })
        }
    }

    return (
        <MotionLI classNames={[styles.container]} onClick={handleClick}>
            <section className={styles.wrapperPhotoRate}>
                {photo ? (
                    <NextImageMotion className={styles.avatar} src={photo} alt={"avatar"} width={72} height={72} />
                ) : (
                    <ImageStatic className={styles.avatar} src="/png/default_avatar.png" alt={"avatar"} width={72} height={72} />
                )}
                <div className={styles.rateBadge}>
                    <Image src="/svg/star.svg" alt="star" width={12} height={12} unoptimized />
                    <p>{rate}</p>
                </div>
            </section>
            <section className={styles.wrapperInfo}>
                <div className={styles.nameAndGeo}>
                    <h3>{name}</h3>
                    <GeoTagging location={geo} size={16} />
                </div>
                <ul className={styles.services}>
                    {services?.map((item, index) => (
                        <BadgeServices key={`${item.label}_${name}_${index}`} {...offer} />
                    ))}
                </ul>
            </section>
        </MotionLI>
    )
}

export const PeopleCard = memo($PeopleCard)
