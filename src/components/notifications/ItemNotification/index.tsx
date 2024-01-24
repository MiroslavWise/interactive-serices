import dayjs from "dayjs"
import Link from "next/link"
import { type ReactNode, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"
import type { TTypeIconCurrentNotification, TTypeIconNotification } from "./types/types"

import { ButtonsDots } from "./components/ButtonsDots"
import { Button, ButtonLink, NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import { useAuth, dispatchVisibleNotifications, dispatchAddTestimonials } from "@/store"
import { serviceBarters, serviceNotifications, serviceProfile, serviceTestimonials } from "@/services"

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
    const { created, provider, operation, data, id, read } = props ?? {}
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)

    const idUser = data?.consigner?.userId === userId ? data?.initiator?.userId : data?.consigner?.userId

    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(idUser!),
        queryKey: ["profile", idUser!],
        enabled: !!idUser,
    })

    const { refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: false,
    })

    const offerId: number | null = useMemo(() => {
        if (!data || !userId) {
            return null
        }
        if (Number(data?.initiator?.userId) === Number(userId)) {
            return Number(data?.consignedId)
        } else {
            return Number(data?.initialId)
        }
    }, [data, userId])

    const { data: dataTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: data?.id!,
            }),
        queryKey: ["testimonials", { barterId: data?.id, targetId: offerId, provider: "offer" }],
        enabled:
            ["executed", "destroyed", "completed"]?.includes(data?.status!) && !!offerId && ["completion-recall-no", "completion-recall"].includes(operation!),
    })

    const isFeedback = useMemo(() => {
        return dataTestimonials?.res?.some((item) => item?.userId === userId && item?.barterId === data?.id)
    }, [userId, data?.id, dataTestimonials?.res])

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
                                href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchVisibleNotifications(false)
                                }}
                            >
                                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                            </Link>
                        </p>
                    )
                } else {
                    return (
                        <p>
                            Пользователь{" "}
                            <Link
                                href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchVisibleNotifications(false)
                                }}
                            >
                                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                            </Link>{" "}
                            предложил вам обмен.
                        </p>
                    )
                }
            }
            if (["completion-yes", "completion-survey", "completion-no"].includes(operation!)) {
                return (
                    <p>
                        Расскажите, обмен с пользователем{" "}
                        <Link
                            href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchVisibleNotifications(false)
                            }}
                        >
                            {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                        </Link>{" "}
                        состоялся?
                    </p>
                )
            }
            if (["feedback-received", "completion-recall"].includes(operation!)) {
                return (
                    <p>
                        Пользователь{" "}
                        <Link
                            href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchVisibleNotifications(false)
                            }}
                        >
                            {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                        </Link>{" "}
                        подтвердил, что обмен состоялся. Здорово! Вы можете рассказать как все прошло в отзывах.
                    </p>
                )
            }
            if (operation === "completion-recall-no") {
                return (
                    <p>
                        Пользователь{" "}
                        <Link
                            href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchVisibleNotifications(false)
                            }}
                        >
                            {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                        </Link>{" "}
                        подтвердил, что обмен не состоялся. Вы можете рассказать как все прошло в отзывах.
                    </p>
                )
            }
            if (operation === "accepted") {
                return (
                    <p>
                        Пользователь {dataProfile?.res?.firstName} {dataProfile?.res?.lastName} принял ваш запрос на обмен
                    </p>
                )
            }
        }

        return null
    }, [data, provider, userId, dataProfile])

    const buttons: ReactNode | null = useMemo(() => {
        if (provider === "barter") {
            if (data?.status === "initiated" || operation === "accepted") {
                if (data?.userId !== userId) {
                    const chat = data?.threadId ? { thread: data?.threadId } : { "barter-id": `${data?.id!}-${idUser}` }

                    return (
                        <ButtonLink
                            type="button"
                            typeButton="fill-primary"
                            label="Перейти в чат"
                            href={{ pathname: `/messages`, query: chat }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchVisibleNotifications(false)
                            }}
                            data-threads
                        />
                    )
                }
            } else if (["completion-survey"].includes(operation!) && ["completed", "executed", "destroyed"].includes(data?.status!)) {
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
            } else if (
                ["completion-recall", "completion-recall-no"].includes(operation!) &&
                ["completed", "destroyed"].includes(data?.status!) &&
                isFeedback === false
            ) {
                return <Button type="button" typeButton="fill-primary" label="Написать отзыв" onClick={handleRecall} />
            } else if (operation === "completion-yes") {
                return (
                    <span data-operation={operation}>
                        <div data-img>
                            <img src="/svg/check-primary.svg" alt="check" width={16} height={16} />
                        </div>{" "}
                        Обмен состоялся
                    </span>
                )
            } else if (operation === "completion-no") {
                return (
                    <span data-operation={operation}>
                        <div data-img>
                            <img src="/svg/x-red.svg" alt="check" width={16} height={16} />
                        </div>{" "}
                        Обмен не состоялся
                    </span>
                )
            } else if (operation === "feedback-received") {
                return (
                    <span data-operation={operation}>
                        <div data-img>
                            <img src="/svg/check-primary.svg" alt="check" width={16} height={16} />
                        </div>{" "}
                        Вы оставили отзыв
                    </span>
                )
            }
        }

        return null
    }, [data, provider, userId, dataProfile, operation, loading, isFeedback])

    function handleCompletion(value: boolean) {
        if (!loading) {
            setLoading(true)
            Promise.all([
                serviceNotifications.patch({ enabled: true, operation: value ? "completion-yes" : "completion-no", read: true }, id!),
                serviceBarters.patch({ enabled: value, status: value ? "completed" : "destroyed" }, data?.id!),
            ]).then(() => {
                refetch().then(() => {
                    setLoading(false)
                })
            })
        }
    }

    function handleRecall() {
        dispatchAddTestimonials({
            visible: true,
            profile: dataProfile?.res!,
            threadId: data?.threadId!,
            barterId: data?.id!,
            testimonials: dataTestimonials?.res!,
            notificationId: id!,
        })
    }

    return (
        <li className={styles.container} data-type={type} data-active={!read}>
            <div data-avatar>
                {currentType === "barter" ? (
                    <NextImageMotion src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                ) : ["information", "warning", "error"].includes(type) ? (
                    <img src={IMG_TYPE?.[currentType]!} alt="type" width={24} height={24} />
                ) : null}
            </div>
            <section>
                <article>
                    {text}
                    <time dateTime={created}>{daysAgo(dayjs(created).format()!)} назад</time>
                    <ButtonsDots id={id} refetch={refetch} disabled={["completion-recall", "completion-recall-no", "completion-survey"].includes(operation!)} />
                </article>
                <div data-buttons>{buttons}</div>
            </section>
        </li>
    )
}
