"use client"

import { useQuery } from "@tanstack/react-query"

import { ComponentsNotification } from "@/components/profile"

import { cx } from "@/lib/cx"
import { serviceNotifications } from "@/services/notifications"
import { useVisibleNotifications, dispatchVisibleNotifications } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NotificationsMobile() {
    const visible = useVisibleNotifications(({ visible }) => visible)

    const { data: dataNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications"],
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
                    <ul>
                        {maps.map((item) => (
                            <ComponentsNotification key={item.id + "-notification"} {...item} />
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
