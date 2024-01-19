import dayjs from "dayjs"
import Link from "next/link"
import { type ReactNode, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"
import type { TTypeIconCurrentNotification, TTypeIconNotification } from "./types/types"

import { ButtonsDots } from "./components/ButtonsDots"
import { Button, ButtonLink, NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import { useAuth, dispatchVisibleNotifications } from "@/store"
import { serviceBarters, serviceNotifications, serviceUser } from "@/services"

import styles from "./styles/style.module.scss"

const IMG_TYPE: Record<TTypeIconCurrentNotification, string> = {
    chat: "/svg/notifications/chat.svg",
    alert: "/svg/notifications/alert-circle.svg",
    barter: "/svg/notifications/repeat.svg",
    sos: "/svg/notifications/sos.svg",
    personal: "/svg/notifications/profile.svg",
    default: "/svg/notifications/default.svg",
}

export const ItemNotification = (props: IResponseNotifications) => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const { created, provider, operation, data, id } = props ?? {}

    const idUser = data?.consigner?.userId === userId ? data?.initiator?.userId : data?.consigner?.userId

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUser.getId(idUser!),
        queryKey: ["user", { userId: idUser }],
        enabled: !!idUser,
    })

    const { refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: false,
    })

    const type: TTypeIconNotification = useMemo(() => {
        switch (provider) {
            case "barter":
                return "barter"
            default:
                return "barter"
        }
    }, [provider])

    const currentType: TTypeIconCurrentNotification = useMemo(() => {
        switch (provider) {
            case "barter":
                return "barter"
            default:
                return "default"
        }
    }, [provider])

    const text: ReactNode | string | null = useMemo(() => {
        if (provider === "barter") {
            if (data?.status === "initiated") {
                if (data?.userId === userId) {
                    return (
                        <p>
                            Вы предложили обмен{" "}
                            <Link
                                href={{ pathname: "/user", query: { id: dataUser?.res?.id! } }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchVisibleNotifications(false)
                                }}
                            >
                                {dataUser?.res?.profile?.firstName} {dataUser?.res?.profile?.lastName}
                            </Link>
                        </p>
                    )
                } else {
                    return (
                        <p>
                            Пользователь{" "}
                            <Link
                                href={{ pathname: "/user", query: { id: dataUser?.res?.id! } }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchVisibleNotifications(false)
                                }}
                            >
                                {dataUser?.res?.profile?.firstName} {dataUser?.res?.profile?.lastName}
                            </Link>{" "}
                            предложил вам обмен.
                        </p>
                    )
                }
            }
        }

        return null
    }, [data, provider, userId, dataUser])

    const buttons: ReactNode | null = useMemo(() => {
        if (provider === "barter") {
            if (data?.status === "initiated") {
                if (data?.userId !== userId) {
                    return (
                        <ButtonLink
                            type="button"
                            typeButton="fill-primary"
                            label="Перейти в чат"
                            href={{ pathname: `/messages`, query: { "barter-id": `${data?.id!}-${idUser}` } }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchVisibleNotifications(false)
                            }}
                        />
                    )
                }
            }
            if (operation === "completion-survey") {
                return (
                    <>
                        <Button
                            type="button"
                            typeButton="fill-primary"
                            label="Да"
                            onClick={(event) => {
                                event.stopPropagation()
                                handleCompletion(true)
                            }}
                            loading={loading}
                            data-yes-or-not
                        />
                        <Button
                            type="button"
                            typeButton="regular-primary"
                            label="Нет"
                            onClick={(event) => {
                                event.stopPropagation()
                                handleCompletion(false)
                            }}
                            loading={loading}
                            data-yes-or-not
                        />
                    </>
                )
            }
        }

        return null
    }, [data, provider, userId, dataUser, operation, loading])

    function handleCompletion(value: boolean) {
        if (!loading) {
            setLoading(true)
            Promise.all([
                serviceNotifications.patch({ enabled: true, operation: value ? "completion-yes" : "completion-no" }, id!),
                serviceBarters.patch({ enabled: value, status: value ? "completed" : "destroyed" }, data?.id!),
            ]).then((responses) => {
                refetch().then(() => {
                    setLoading(false)
                })
            })
        }
    }

    return (
        <li className={styles.container} data-type={type} data-active={false}>
            <div data-avatar>
                {currentType === "barter" ? (
                    <NextImageMotion src={dataUser?.res?.profile?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                ) : ["information", "warning", "error"].includes(type) ? (
                    <img src={IMG_TYPE?.[currentType]!} alt="type" width={24} height={24} />
                ) : null}
            </div>
            <section>
                <article>
                    {text}
                    <time dateTime={created}>{daysAgo(dayjs(created).format())} назад</time>
                    <ButtonsDots id={id} refetch={refetch} />
                </article>
                <div data-buttons>{buttons}</div>
            </section>
        </li>
    )
}
