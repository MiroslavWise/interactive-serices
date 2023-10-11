"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import {
    MobileInteractive,
    MobileMainInfo,
    StatisticAndFeedback,
    MainInfo,
} from "@/components/profile"
import { MotionUL } from "@/components/common/Motion"

import { cx } from "@/lib/cx"
import { serviceUsers } from "@/services/users"

import styles from "@/scss/page.module.scss"

export default function UserId() {
    const searchParams = useSearchParams()
    const id = searchParams?.get("id")
    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(id!),
        queryKey: ["user", id],
    })

    return (
        <div className={cx(styles.page, isMobile && styles.mobile)}>
            {isMobile ? (
                <MotionUL classNames={[styles.containerMobile]} id="user-id">
                    <MobileMainInfo
                        name={`${data?.res?.profile?.firstName} ${data?.res?.profile?.lastName}`}
                        photo={data?.res?.profile?.image?.attributes?.url!}
                        about={data?.res?.profile?.about!}
                        userId={data?.res?.profile?.userId! || Number(id)}
                        created={data?.res?.profile?.created!}
                    />
                    <MobileInteractive />
                </MotionUL>
            ) : (
                <section className={styles.container}>
                    <MainInfo user={data?.res!} />
                    <StatisticAndFeedback />
                </section>
            )}
        </div>
    )
}
