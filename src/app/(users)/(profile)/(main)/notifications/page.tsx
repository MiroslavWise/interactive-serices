"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { ItemNotification } from "@/components/notifications"

import { useAuth } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"
import { NAVIGATION_STATUSES, type TTypeWaiting } from "@/components/templates/NotificationsMobile/constants/navigation"

export default function Notifications() {
    const userId = useAuth(({ userId }) => userId)
    const [status, setStatus] = useState<TTypeWaiting>("all")

    const { data: dataNotifications, refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    return (
        <>
            <header>
                <h4>Уведомления</h4>
                <nav>
                    {NAVIGATION_STATUSES.map((item) => (
                        <a
                            key={`::${item.value}::key::nav::`}
                            data-active={status === item.value}
                            onClick={(event) => {
                                event.stopPropagation()
                                if (item.value !== status) {
                                    setStatus(item.value)
                                }
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </header>
            {dataNotifications?.res?.length ? (
                <ul>
                    {dataNotifications?.res?.map((item) => (
                        <ItemNotification key={`::${item.id}::notification::`} {...item} refetch={refetch} />
                    ))}
                </ul>
            ) : (
                <article>
                    <h2>У вас пока нет уведомлений</h2>
                    <p>
                        Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое
                        другое. Вы будете проинформированы обо всем важном.
                    </p>
                </article>
            )}
        </>
    )
}
