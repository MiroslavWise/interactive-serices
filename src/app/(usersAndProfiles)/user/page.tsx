"use client"

import { Suspense } from "react"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { MotionUL } from "@/components/common/Motion"
import { MainInfo, StatisticAndFeedback } from "@/components/profile"
import { MobileMainInfo } from "@/components/profile/MobileMainInfo"
import { MobileInteractive } from "@/components/profile/MobileInteractive"

import { cx } from "@/lib/cx"
import { profileService } from "@/services/profile"

import styles from "@/scss/page.module.scss"

export default function UserId() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const { data, dataUpdatedAt } = useQuery({
        queryFn: () => profileService.getProfileThroughUserId(id!),
        queryKey: ["profile", id],
    })

    return (
        <div className={cx(styles.page, isMobile && styles.mobile)}>
            {isMobile ? (
                <MotionUL classNames={[styles.containerMobile]} id="user-id">
                    <MobileMainInfo
                        name={`${data?.res?.firstName} ${data?.res?.lastName}`}
                        photo={data?.res?.image?.attributes?.url!}
                        about={data?.res?.about!}
                        userId={data?.res?.userId!}
                        created={data?.res?.created!}
                    />
                    <MobileInteractive />
                </MotionUL>
            ) : (
                <section className={styles.container}>
                    <MainInfo profile={data?.res!} />
                    <StatisticAndFeedback />
                </section>
            )}
        </div>
    )
}
