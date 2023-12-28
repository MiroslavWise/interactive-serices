import dayjs from "dayjs"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
    const userId = useAuth(({ userId }) => userId)

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
    })

    const addressMain = data?.res?.addresses?.find((item) => item?.addressType === "main") || ""

    return (
        <header className={styles.containerHeader}>
            <div className={styles.avatar}>
                {data?.res?.profile?.image?.attributes?.url ? (
                    <NextImageMotion
                        className={styles.photo}
                        src={
                            data?.res?.profile?.image?.attributes?.url!
                                ? data?.res?.profile?.image?.attributes?.url!
                                : "/png/default_avatar.png"
                        }
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
                    {data?.res?.profile?.firstName || "Имя"} {data?.res?.profile?.lastName || "Фамилия"}
                </h4>
                {addressMain ? <GeoTagging size={16} fontSize={14} location={addressMain?.additional} /> : null}
                {data?.res?.created ? <p data-start>На Sheira с {dayjs(data?.res?.created!).format("DD.MM.YYYY")}</p> : null}
            </section>
        </header>
    )
}
