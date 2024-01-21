"use client"

import { flushSync } from "react-dom"
import { useQueries, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { memo, useState, useMemo, useEffect } from "react"

import type { IBarterResponse } from "@/services/barters/types"
import type { IUserResponse } from "@/services/users/types/usersService"

import { Button, GeoTagging, NextImageMotion } from "@/components/common"

import { useWebSocket } from "@/context"
import { daysAgo, useCountMessagesNotReading, usePush } from "@/helpers"
import { serviceTestimonials, serviceThreads, serviceBarters, serviceProfile } from "@/services"
import { useAuth, useOffersCategories, dispatchAddTestimonials, dispatchBallonOffer } from "@/store"

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

    const { refetch: refetchBarters } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", { receiver: userId, status: "initiated" }],
        enabled: false,
    })

    const { data } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })

    const { res, ok } = data ?? {}
    const { status, consigner, initiator } = stateBarter ?? {}

    const [{ data: dataInitiatorProfile }, { data: dataConsignerProfile }] = useQueries({
        queries: [
            {
                queryFn: () => serviceProfile.getUserId(initiator?.userId!),
                queryKey: ["profile", initiator?.userId!],
                enabled: ok && ["executed", "completed"].includes(status!),
            },
            {
                queryFn: () => serviceProfile.getUserId(consigner?.userId!),
                queryKey: ["profile", consigner?.userId!],
                enabled: ok && ["executed", "completed"].includes(status!),
            },
        ],
    })

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
    }, [userData])

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
            serviceBarters.patch({ status: "executed" }, idBarter!).then((response) => {
                if (response.ok) {
                    const date = new Date()
                    const receiverIds = [Number(userData?.id)]
                    const message = `Пользователь ${user?.username} согласился принять ваш запрос на обмен!`
                    socket?.emit("barter", {
                        receiverIds: receiverIds,
                        message: message,
                        barterId: idBarter,
                        emitterId: userId!,
                        status: "accepted",
                        threadId: threadId!,
                        created: date,
                    })
                    refetchBarters()
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
                serviceBarters.patch({ status: "canceled", enabled: false }, idBarter!),
                serviceThreads.patch({ enabled: false }, Number(threadId)),
            ]).then(() => {
                Promise.all([refetchBarters(), refetchCountMessages()]).then(() => {
                    flushSync(() => {
                        setLoading(false)
                        handleReplace("/messages")
                    })
                })
            })
        }
    }

    return data?.ok ? (
        <section className={styles.wrapper} data-type={status}>
            <article>
                {status === "executed" ? (
                    <>
                        <div data-lath>
                            <span>В процессе</span>
                        </div>
                        <div data-barter-people>
                            <div data-item-people-offer>
                                <div data-img>
                                    <NextImageMotion src={dataInitiatorProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                                </div>
                                <a
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: initiator!,
                                        })
                                    }}
                                >
                                    {infoOffers?.initiator?.title}
                                </a>
                            </div>
                            <div data-repeat>
                                <img src="/svg/repeat-gray.svg" alt="repeat" width={16} height={16} />
                            </div>
                            <div data-item-people-offer>
                                <div data-img>
                                    <NextImageMotion src={dataConsignerProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
                                </div>
                                <a
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: consigner!,
                                        })
                                    }}
                                >
                                    {infoOffers?.consigner?.title}
                                </a>
                            </div>
                        </div>
                    </>
                ) : (
                    <div data-head>
                        <div data-time>
                            <div data-img>
                                <img src="/svg/clock-fast-forward.svg" alt="clock" width={16} height={16} />
                            </div>
                            <time>{daysAgo(res?.created)}</time>
                        </div>
                        {geo ? <GeoTagging size={16} fontSize={12} location={geo?.additional} /> : null}
                    </div>
                )}
                {["initiated", "completed"].includes(status!) ? (
                    <p>
                        {initiator?.userId === userId ? (
                            <>
                                Вы предлагаете{" "}
                                <span
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: initiator!,
                                        })
                                    }}
                                >
                                    {infoOffers?.initiator?.title?.toLowerCase()}
                                </span>{" "}
                                взамен на{" "}
                                <span
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: consigner!,
                                        })
                                    }}
                                >
                                    {infoOffers?.consigner?.title?.toLowerCase()}
                                </span>
                            </>
                        ) : consigner?.userId === userId ? (
                            <>
                                <span>{userData?.profile?.firstName}</span> предлагает вам{" "}
                                <span
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: consigner!,
                                        })
                                    }}
                                >
                                    {infoOffers?.consigner?.title?.toLowerCase()}
                                </span>{" "}
                                взамен на{" "}
                                <span
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatchBallonOffer({
                                            visible: true,
                                            offer: initiator!,
                                        })
                                    }}
                                >
                                    {infoOffers?.initiator?.title?.toLowerCase()}
                                </span>
                                {status === "completed" ? "(обмен завершён)" : ""}
                            </>
                        ) : null}
                    </p>
                ) : null}
            </article>
            {status !== "executed" ? (
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
                    ) : status === "completed" && !isFeedback && dataTestimonials?.ok ? (
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
            ) : null}
        </section>
    ) : null
})
