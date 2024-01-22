"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { cx } from "@/lib/cx"
import { serviceNotifications } from "@/services"
import { type TTypeWaiting, NAVIGATION_STATUSES } from "./constants/navigation"
import { useVisibleNotifications, dispatchVisibleNotifications, useAuth } from "@/store"

import styles from "./styles/style.module.scss"

export function NotificationsMobile() {
    const visible = useVisibleNotifications(({ visible }) => visible)
    const userId = useAuth(({ userId }) => userId)
    const [status, setStatus] = useState<TTypeWaiting>("all")

    const [stateNotifications, setStateNotifications] = useState<IResponseNotifications[]>([])
    const [waitingNotifications, setWaitingNotifications] = useState<IResponseNotifications[]>([])

    const { data: dataNotifications, refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: !!userId,
    })

    useEffect(() => {
        const values = dataNotifications?.res

        if (values && userId) {
            setStateNotifications(values)

            const array: IResponseNotifications[] = []
            const arrayNotRead: number[] = []

            for (const item of values) {
                if (item?.provider === "barter") {
                    if (item?.data?.status === "initiated") {
                        if (item?.data?.userId !== userId) {
                            array.push(item)
                        }
                    } else if (["completion-survey", "completion-recall", "accepted"].includes(item?.operation!)) {
                        array.push(item)
                    }
                }
                if (!item.read) {
                    arrayNotRead.push(item.id)
                }

                const timer = setTimeout(() => {
                    if (arrayNotRead?.length > 0) {
                        Promise.all(arrayNotRead.map((item) => serviceNotifications.patch({ read: true, enabled:true }, item))).then((responses) => {
                            if (responses.length > 0) {
                                refetch()
                            }
                        })
                    }
                }, 5 * 1000)

                return () => clearTimeout(timer)
            }

            setWaitingNotifications(array)
        }
    }, [dataNotifications?.res, userId])

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
                {!!stateNotifications?.length && status === "all" ? (
                    <ul>
                        {stateNotifications?.map((item) => (
                            <ItemNotification key={`::notification::all:${item.id}::`} {...item} />
                        ))}
                    </ul>
                ) : !!waitingNotifications?.length && status === "waiting" ? (
                    <ul>
                        {waitingNotifications?.map((item) => (
                            <ItemNotification key={`::notification::waiting::${item.id}::`} {...item} />
                        ))}
                    </ul>
                ) : (
                    <article>
                        <h3>У вас пока нет уведомлений</h3>
                        <p>
                            Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое другое. Вы будете
                            проинформированы обо всем важном.
                        </p>
                    </article>
                )}
            </section>
        </div>
    )
}
