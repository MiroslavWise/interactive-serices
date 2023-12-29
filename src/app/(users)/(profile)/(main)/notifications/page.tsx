"use client"

import { useQuery } from "@tanstack/react-query"

import { ItemNotification } from "@/components/notifications"

import { useAuth } from "@/store/hooks"
import { serviceNotifications } from "@/services/notifications"

import styles from "./page.module.scss"

export default function Notifications() {
    const userId = useAuth(({ userId }) => userId)

    const { data: dataNotifications, refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
    })

    return (
        <section className={styles.wrapper}>
            <header>
                <h4>Уведомления</h4>
                <a data-null={!dataNotifications?.res?.length}>Прочитать все</a>
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
        </section>
    )
}
