"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { ItemNotification } from "@/components/notifications"

import { cx } from "@/lib/cx"
import { serviceNotifications } from "@/services/notifications"
import { type TTypeWaiting, NAVIGATION_STATUSES } from "./constants/navigation"
import { useVisibleNotifications, dispatchVisibleNotifications, useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NotificationsMobile() {
    const visible = useVisibleNotifications(({ visible }) => visible)
    const userId = useAuth(({ userId }) => userId)
    const [status, setStatus] = useState<TTypeWaiting>("all")

    const { data: dataNotifications, refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
        enabled: !!userId,
    })

    const maps = dataNotifications?.res || []

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section>
                <header>
                    <h3>Уведомления</h3>
                    <button onClick={() => dispatchVisibleNotifications(false)}>
                        <img src="/svg/x-close.svg" alt="X" width={24} height={24} />
                    </button>
                </header>
                {maps.length ? (
                    <nav>
                        {NAVIGATION_STATUSES.map((item) => (
                            <a
                                key={`::${item.value}::key::nav::`}
                                data-active={status === item.value}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setStatus(item.value)
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                ) : null}
                {maps.length ? (
                    <ul>
                        {maps.map((item) => (
                            <ItemNotification key={`::${item.id}::notification::`} {...item} refetch={refetch} />
                        ))}
                    </ul>
                ) : (
                    <article>
                        <h3>У вас пока нет уведомлений</h3>
                        <p>
                            Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое
                            другое.
                        </p>
                    </article>
                )}
            </section>
        </div>
    )
}
