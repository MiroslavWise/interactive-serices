"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import type { IPropsPageUserId } from "./types"

import {
    MobileInteractive,
    MobileMainInfo,
    StatisticAndFeedback,
    MainInfo,
} from "@/components/profile"
import { MotionUL } from "@/components/common/Motion"

import { cx } from "@/lib/cx"
import { serviceProfile } from "@/services/profile"

import styles from "@/scss/page.module.scss"

export default function UserId({ searchParams: { id } }: IPropsPageUserId) {
    const { data } = useQuery({
        queryFn: () => serviceProfile.getUserId(id!),
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
