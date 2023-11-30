import dayjs from "dayjs"
import Image from "next/image"

import type { THeaderBlock } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAddress } from "@/helpers"
import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
    const user = useAuth(({ user }) => user)
    const imageProfile = useAuth(({ imageProfile }) => imageProfile)
    const createdUser = useAuth(({ createdUser }) => createdUser)
    const { addressMain } = useAddress()

    return (
        <header className={styles.containerHeader}>
            <div className={styles.avatar}>
                {imageProfile?.attributes?.url ? (
                    <NextImageMotion
                        className={styles.photo}
                        src={imageProfile?.attributes?.url! ? imageProfile?.attributes?.url! : "/png/default_avatar.png"}
                        alt="avatar"
                        width={94}
                        height={94}
                    />
                ) : (
                    <ImageStatic src="/png/default_avatar.png" alt="avatar" width={94} height={94} className={styles.photo} />
                )}
                {true ? (
                    <Image className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} unoptimized />
                ) : null}
            </div>
            <section className={styles.title}>
                <h4>
                    {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
                </h4>
                {addressMain ? <GeoTagging size={16} fontSize={14} location={addressMain?.additional} /> : null}
                {createdUser ? <p>Присоединился {dayjs(createdUser!).format("DD.MM.YYYY")}</p> : null}
            </section>
            {/* <BlockOther label="Достижения" classNames={[styles.achievements]}>
                {ACHIEVEMENTS.map((item) => (
                    <Image
                        key={item.assignment}
                        src={item.src}
                        alt={item.assignment}
                        width={25}
                        height={25}
                    />
                ))}
            </BlockOther> */}
        </header>
    )
}
