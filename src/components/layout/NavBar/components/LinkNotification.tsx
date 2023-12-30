import Link from "next/link"
import { memo, useState } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/hooks"
import { useOutsideClickEvent } from "@/helpers"
import { serviceNotifications } from "@/services/notifications"
import { ItemNotification } from "@/components/notifications"

export const LinkNotification = memo(function LinkNotification() {
    const pathname = usePathname()
    const [active, setActive, ref] = useOutsideClickEvent()

    const userId = useAuth(({ userId }) => userId)

    const { data, refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    return (
        <a
            key={"::notifications::link::"}
            data-active={pathname?.includes("/notifications")}
            data-notification
            onClick={(event) => {
                console.log("on clieck setActive: ")
                setActive((state) => !state)
                event.stopPropagation()
            }}
            ref={ref}
        >
            <img src="/icons/mobile/fill/bell-fill.svg" alt="bell" width={24} height={24} />
            <span>Уведомления</span>
            {data?.res?.length ? (
                <div data-count>
                    <span>{data?.res?.length || 0}</span>
                </div>
            ) : null}

            <section data-active={active} onClick={(event) => event.stopPropagation()}>
                {data?.res?.length ? (
                    <ul>
                        <p>Просмотренные</p>
                        {data?.res?.map((item) => (
                            <ItemNotification key={`::item::notification::popup::`} {...item} refetch={refetch} />
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
