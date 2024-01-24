import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { serviceProfile, serviceUser } from "@/services"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
    const userId = useAuth(({ userId }) => userId)

    const { data } = useQuery({
        queryFn: () => serviceUser.getId(userId!),
        queryKey: ["user", { userId: userId }],
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
            <div className={styles.avatar} data-null-avatar={!!dataProfile?.res?.image?.attributes}>
                {dataProfile?.res?.image?.attributes ? (
                    <NextImageMotion className={styles.photo} src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
                ) : (
                    <img src="/svg/profile-null.svg" alt="avatar" height={48} width={48} />
                )}
                {!!dataProfile?.res?.image?.attributes ? (
                    <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
                ) : null}
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
