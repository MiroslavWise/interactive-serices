"use client"

import { flushSync } from "react-dom"
import { useQuery } from "@tanstack/react-query"
import { memo, useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import type { IBarterResponse } from "@/services/barters/types"
import type { IUserResponse } from "@/services/users/types/usersService"

import { Button, GeoTagging } from "@/components/common"

import { daysAgo, useCountMessagesNotReading, usePush } from "@/helpers"
import { useWebSocket } from "@/context"
import { serviceBarters } from "@/services/barters"
import { serviceThreads } from "@/services/threads"
import { serviceTestimonials } from "@/services/testimonials"
import { useAuth, useOffersCategories, dispatchAddTestimonials } from "@/store/hooks"

import styles from "./styles/notice-barter.module.scss"

export const NoticeBarter = memo(function NoticeBarter({ idBarter, userData }: { idBarter: number; userData?: IUserResponse | null }) {
    const threadId = useSearchParams().get("thread")
    const user = useAuth(({ user }) => user)
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const [loading, setLoading] = useState(false)
    const { socket } = useWebSocket()
    const { handleReplace } = usePush()
    const [stateBarter, setStateBarter] = useState<IBarterResponse | null>(null)
    const { refetchCountMessages } = useCountMessagesNotReading()
    const { data } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })

    const { res } = data ?? {}
    const { status, consigner, initiator } = stateBarter ?? {}

    useEffect(() => {
        if (!!res) {
            setStateBarter(res)
        }
    }, [res])

    const offerId: number | null = useMemo(() => {
        if (!res || !userId) {
            return null
        }
        if (Number(res?.initiator?.userId) === Number(userId)) {
            return Number(res?.consignedId)
        } else {
            return Number(res?.initialId)
        }
    }, [res, userId])

    const { data: dataTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: idBarter!,
            }),
        queryKey: ["testimonials", `barter=${idBarter}`, `offer=${offerId!}`],
        enabled: ["executed", "destroyed", "completed"]?.includes(res?.status!) && !!offerId,
    })

    const infoOffers = useMemo(() => {
        if (!categories.length || !consigner || !initiator) {
            return null
        }
        return {
            initiator: categories?.find((item) => Number(item.id) === Number(initiator?.categoryId)),
            consigner: categories?.find((item) => Number(item.id) === Number(consigner?.categoryId)),
        }
    }, [categories, consigner, initiator])

    const geo = useMemo(() => {
        return userData?.addresses?.find((item) => item?.addressType === "main")
    }, [res])

    const isFeedback = useMemo(() => {
        return dataTestimonials?.res?.find((item) => item?.userId === userId && item?.barterId === idBarter)
    }, [userId, idBarter, dataTestimonials?.res])

    function handleCompleted() {
        dispatchAddTestimonials({
            visible: true,
            barter: data?.res!,
            user: userData!,
            threadId: Number(threadId),
            testimonials: dataTestimonials?.res!,
        })
    }

    function handleAccept() {
        if (!loading) {
            setLoading(true)
            serviceBarters
                .patch(
                    {
                        updatedById: userId,
                        status: "executed",
                    },
                    idBarter!,
                )
                .then((response) => {
                    if (response.ok) {
                        const date = new Date()
                        const receiverIds = [Number(userData?.id)]
                        const message = `Пользователь ${user?.username} согласился принять ваш запрос на обмен!`
                        socket?.emit("barter", {
                            receiverIds: receiverIds,
                            message: message,
                            barterId: idBarter,
                            emitterId: userId!,
                            status: "executed",
                            threadId: threadId!,
                            created: date,
                        })
                    }
                    flushSync(() => {
                        setStateBarter((prev) => ({
                            ...prev!,
                            status: "executed",
                        }))
                        setLoading(false)
                    })
                })
        }
    }

    function handleRejection() {
        if (!loading) {
            setLoading(true)
            Promise.all([
                serviceBarters.patch(
                    {
                        updatedById: userId,
                        status: "canceled",
                    },
                    idBarter!,
                ),
                serviceThreads.patch({ enabled: false }, Number(threadId)),
            ]).then(() => {
                refetchCountMessages().then(() => {
                    handleReplace("/messages")
                })
            })
        }
    }

    return data?.ok ? (
        <section className={styles.wrapper}>
            <article>
                <div data-head>
                    <div data-time>
                        <div data-img>
                            <img src="/svg/clock-fast-forward.svg" alt="clock" width={16} height={16} />
                        </div>
                        <time>{daysAgo(res?.created)}</time>
                    </div>
                    {geo ? <GeoTagging size={16} fontSize={12} location={geo?.additional} /> : null}
                </div>
                <p>
                    {["executed", "initiated", "completed"].includes(status!) ? (
                        <>
                            {initiator?.userId === userId ? (
                                <>
                                    Вы предлагаете <span>{infoOffers?.initiator?.title?.toLowerCase()}</span> взамен на{" "}
                                    <span>{infoOffers?.consigner?.title?.toLowerCase()}</span>
                                </>
                            ) : consigner?.userId === userId ? (
                                <>
                                    <span>{userData?.profile?.firstName}</span> предлагает вам{" "}
                                    <span>{infoOffers?.consigner?.title?.toLowerCase()}</span> взамен на{" "}
                                    <span>{infoOffers?.initiator?.title?.toLowerCase()}</span>
                                    {status === "completed" ? "(обмен завершён)" : ""}
                                </>
                            ) : null}
                        </>
                    ) : null}
                </p>
            </article>
            <footer>
                {status === "initiated" && res?.consigner?.userId === userId ? (
                    <>
                        <Button
                            type="button"
                            typeButton="white"
                            label="Принять"
                            loading={loading}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleAccept()
                            }}
                        />
                        <Button
                            type="button"
                            typeButton="fill-opacity"
                            label="Отказаться"
                            loading={loading}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleRejection()
                            }}
                        />
                    </>
                ) : ["completed", "executed"].includes(status!) && !isFeedback && dataTestimonials?.ok ? (
                    <Button
                        type="button"
                        typeButton="white"
                        label="Оставить отзыв"
                        loading={loading}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleCompleted()
                        }}
                    />
                ) : null}
            </footer>
        </section>
    ) : null
})
