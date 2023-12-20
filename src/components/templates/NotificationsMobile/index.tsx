"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import type { TNotifications } from "./types"

import { ComponentsNotification } from "@/components/profile"

import { cx } from "@/lib/cx"
import { useVisibleNotifications } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"

import styles from "./styles/style.module.scss"

export const NotificationsMobile: TNotifications = ({}) => {
    const visible = useVisibleNotifications(({ visible }) => visible)
    const dispatchVisibleNotifications = useVisibleNotifications(({ dispatchVisibleNotifications }) => dispatchVisibleNotifications)

    const { data: dataNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications"],
    })

    const maps = dataNotifications?.res || []

    return (
        <div className={cx("wrapper-fixed", styles.container)} data-visible={visible}>
            <header className={styles.header}>
                <h4>Уведомления</h4>
                <div className={styles.closeArrowDown} onClick={() => dispatchVisibleNotifications({ visible: false })}>
                    <Image src="/svg/chevron-down.svg" alt="arrow-down" width={24} height={24} unoptimized />
                </div>
            </header>
            <ul>
                {maps.map((item) => (
                    <ComponentsNotification key={item.id + "-notification"} {...item} />
                ))}
            </ul>
        </div>
    )
}
