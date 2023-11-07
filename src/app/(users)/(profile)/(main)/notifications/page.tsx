"use client"

import { useQuery } from "@tanstack/react-query"
import { isMobile } from "react-device-detect"

import { MotionUL } from "@/components/common/Motion"
import { ComponentsNotification } from "@/components/profile/ComponentsNotification"

import { useAuth } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"

import styles from "./page.module.scss"

export default function Notifications() {
    const { userId } = useAuth()

    const { data: dataNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications"],
    })

    console.log("%c dataNotifications", "color: #0ff", dataNotifications)

    return isMobile ? (
        <></>
    ) : (
        <section className={styles.wrapper}>
            <header>
                <div data-total>
                    <h4>{dataNotifications?.res?.length}</h4>
                </div>
                <h4>Новые уведомления</h4>
            </header>
            <MotionUL>
                {dataNotifications?.res?.map((item) => (
                    <ComponentsNotification
                        key={`${item.id}--notification`}
                        {...item}
                    />
                ))}
            </MotionUL>
        </section>
    )
}
