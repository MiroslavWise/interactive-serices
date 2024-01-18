import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common"

import { useAuth } from "@/store/hooks"
import { serviceUser } from "@/services/users"
import { serviceProfile } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
    const userId = useAuth(({ userId }) => userId)

    const { data } = useQuery({
        queryFn: () => serviceUser.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
    })

    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(userId!),
        queryKey: ["profile", userId],
        enabled: !!userId,
    })

    const addressMain = data?.res?.addresses?.find((item) => item?.addressType === "main") || ""

    return (
        <header className={styles.containerHeader}>
            <div className={styles.avatar}>
                {dataProfile?.res?.image?.attributes?.url ? (
                    <NextImageMotion
                        className={styles.photo}
                        src={
                            dataProfile?.res?.image?.attributes?.url!
                                ? dataProfile?.res?.image?.attributes?.url!
                                : "/png/default_avatar.png"
                        }
                        alt="avatar"
                        width={94}
                        height={94}
                    />
                ) : (
                    <ImageStatic src="/png/default_avatar.png" alt="avatar" width={94} height={94} className={styles.photo} />
                )}
                {true ? <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} /> : null}
            </div>
            <section className={styles.title}>
                <h4>
                    {dataProfile?.res?.firstName || "Имя"} {dataProfile?.res?.lastName || "Фамилия"}
                </h4>
                {addressMain ? <GeoTagging size={16} fontSize={14} location={addressMain?.additional} /> : null}
                {data?.res?.created ? <p data-start>На Sheira с {dayjs(data?.res?.created!).format("DD.MM.YYYY")}</p> : null}
            </section>
        </header>
    )
}
