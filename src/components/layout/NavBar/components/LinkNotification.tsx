import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { useAuth } from "@/store"
import { serviceNotifications } from "@/services"
import { useOutsideClickEvent } from "@/helpers"

export const LinkNotification = memo(function LinkNotification() {
    const pathname = usePathname()
    const [count, setCount] = useState<number | null>(null)
    const [state, setState] = useState<{ new: IResponseNotifications[]; old: IResponseNotifications[] }>({ new: [], old: [] })
    const [active, setActive, ref] = useOutsideClickEvent()
    const userId = useAuth(({ userId }) => userId)

    const { data } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        enabled: !!userId,
    })

    useEffect(() => {
        if (data?.res && data?.res?.length > 0) {
            let count = 0
            const newArray: IResponseNotifications[] = []
            const oldArray: IResponseNotifications[] = []
            for (const item of data?.res) {
                if (item.read) {
                    oldArray.push(item)
                } else {
                    newArray.push(item)
                    count += 1
                }
            }
            setState({ new: newArray, old: oldArray })
            setCount(count || null)
        }
    }, [data?.res])

    // useEffect(() => {
    //     if (data?.res) {
    //         const notRead: number[] = []

    //         data?.res?.forEach((item) => {
    //             if (item?.read === false) {
    //                 notRead.push(item.id)
    //             }
    //         })
    //     }
    // }, [active, data?.res])

    return (
        <a
            key={"::notifications::link::"}
            data-active={pathname?.includes("/notifications")}
            data-notification
            onClick={(event) => {
                setActive((state) => !state)
                event.stopPropagation()
            }}
            ref={ref}
        >
            <img src="/icons/mobile/fill/bell-fill.svg" alt="bell" width={24} height={24} />
            <span>Уведомления</span>
            {count ? (
                <div data-count>
                    <span>{count > 9 ? "9+" : count}</span>
                </div>
            ) : null}
            <section data-active={active} onClick={(event) => event.stopPropagation()}>
                {data?.res?.length ? (
                    <ul>
                        {state.new.length > 0 ? (
                            <>
                                <p>Новые уведомления</p>
                                {state.new?.map((item) => (
                                    <ItemNotification key={`::item::notification::popup::`} {...item} />
                                ))}
                            </>
                        ) : null}
                        {state.old.length > 0 ? (
                            <>
                                <p>Просмотренные</p>
                                {state.old?.map((item) => (
                                    <ItemNotification key={`::item::notification::popup::`} {...item} />
                                ))}
                            </>
                        ) : null}
                    </ul>
                ) : (
                    <article>
                        <h3>У вас пока нет уведомлений</h3>
                        <p>Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое другое.</p>
                    </article>
                )}
                <footer>
                    <Link
                        href={{ pathname: "/notifications" }}
                        onClick={(event) => {
                            event.stopPropagation()
                            setActive(false)
                        }}
                    >
                        Посмотреть все
                    </Link>
                </footer>
            </section>
        </a>
    )
})
