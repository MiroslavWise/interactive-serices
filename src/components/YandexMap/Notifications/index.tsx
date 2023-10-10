"use client"

import Image from "next/image"
import { useQuery } from "react-query"

import type { TNotifications } from "./types"

import { MotionUL } from "@/components/common/Motion"
import { PeopleCard } from "@/components/common/PeopleCard/Notifications"
import { Glasses } from "@/components/common/Glasses"

import { cx } from "@/lib/cx"
import { serviceProfile } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const Notifications: TNotifications = ({
    visibleNotification,
    setVisibleNotification,
}) => {
    const { data } = useQuery(["profiles"], () =>
        serviceProfile.get({ limit: 20 }),
    )
    const { res, ok } = data ?? {}

    return (
        <div
            className={cx(
                styles.container,
                visibleNotification && styles.visible,
            )}
        >
            <header className={styles.header}>
                <h4>Предложения</h4>
                <div
                    className={styles.closeArrowDown}
                    onClick={() => setVisibleNotification(false)}
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
                {ok &&
                    res?.map((item) => (
                        <PeopleCard
                            key={`${item.id}_prof_notifications_${item.created}`}
                            avatar={item?.image?.attributes?.url}
                            name={`${item?.firstName} ${item?.lastName}`}
                            date="03/02/2023"
                            rate={4.5}
                            description={item?.about}
                            path={`/user?id=${item.userId}`}
                            userId={item?.userId!}
                        />
                    ))}
            </MotionUL>
            <Glasses />
        </div>
    )
}
