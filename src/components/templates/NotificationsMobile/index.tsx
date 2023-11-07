"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TNotifications } from "./types"

import { Glasses } from "@/components/common/Glasses"
import { MotionUL } from "@/components/common/Motion"
import { ComponentsNotification } from "@/components/profile"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"
import { useVisibleNotifications } from "@/store/state/useVisibleNotifications"

import styles from "./styles/style.module.scss"

export const NotificationsMobile: TNotifications = ({}) => {
    const { visible, dispatchVisibleNotifications } = useVisibleNotifications()

    const { data: dataNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications"],
    })

    const maps = useMemo(() => {
        return dataNotifications?.res || []
    }, [dataNotifications])

    return (
        <div
            className={cx("wrapper-fixed", styles.container)}
            data-visible={visible}
        >
            <header className={styles.header}>
                <h4>Уведомления</h4>
                <div
                    className={styles.closeArrowDown}
                    onClick={() =>
                        dispatchVisibleNotifications({ visible: false })
                    }
                >
                    <Image
                        src="/svg/chevron-down.svg"
                        alt="arrow-down"
                        width={24}
                        height={24}
                    />
                </div>
            </header>
            <MotionUL>
                {maps.map((item) => (
                    <ComponentsNotification
                        key={item.id + "-notification"}
                        {...item}
                    />
                ))}
            </MotionUL>
            <Glasses />
        </div>
    )
}
