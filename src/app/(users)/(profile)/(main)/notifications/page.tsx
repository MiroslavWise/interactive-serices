"use client"

import { useMemo } from "react"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { MotionUL } from "@/components/common/Motion"
import { ComponentsNotification } from "@/components/profile/ComponentsNotification"

import { useAuth } from "@/store/hooks"
import { serviceLogs } from "@/services/logs"

import styles from "./page.module.scss"

export default function Notifications() {
    const { userId } = useAuth()

    const { data } = useQuery({
        queryFn: () => serviceLogs.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
    })

    const notifications = useMemo(() => {
        if (!data?.res || !userId) return []

        return data?.res?.filter(
            (item) =>
                ["create"].includes(item?.operation) &&
                ["Offer", "Barter", "Testimonials"].includes(item.data.name) &&
                item?.data?.entity?.user_id === userId,
        )
    }, [data?.res, userId])

    console.log("%cnotifications: ", "color: #0f0", notifications)

    return isMobile ? (
        <></>
    ) : (
        <section className={styles.wrapper}>
            <header>
                <div data-total>
                    <h4>{notifications.length}</h4>
                </div>
                <h4>Новые уведомления</h4>
            </header>
            <MotionUL>
                {notifications.map((item) => (
                    <ComponentsNotification
                        key={`${item.id}--notification`}
                        {...item}
                    />
                ))}
            </MotionUL>
        </section>
    )
}
