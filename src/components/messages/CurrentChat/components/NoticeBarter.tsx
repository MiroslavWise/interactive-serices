"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { BadgeServices } from "@/components/common/Badge"
import { NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { useWebSocket } from "@/context"
import { serviceBarters } from "@/services/barters"
import { serviceTestimonials } from "@/services/testimonials"
import { GeoTagging } from "@/components/common/GeoTagging"
import { IUserResponse } from "@/services/users/types/usersService"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { useCompletionTransaction } from "@/store/state/useCompletionTransaction"

import styles from "./styles/notice-barter.module.scss"

export const NoticeBarter = ({
    idBarter,
    userData,
    setIsLoadingFullInfo,
    refetchThread,
}: {
    idBarter: number
    userData?: IUserResponse | null
    setIsLoadingFullInfo: Dispatch<SetStateAction<boolean>>
    refetchThread: () => Promise<any>
}) => {
    const { userId, user } = useAuth()
    const threadId = useSearchParams().get("thread")
    const { categories } = useOffersCategories()
    const [loading, setLoading] = useState(false)
    const { socket } = useWebSocket() ?? {}
    const { handleReplace } = usePush()
    const { dispatchCompletion } = useCompletionTransaction()
    const { data, refetch } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
    })

    const offerId: number | null = useMemo(() => {
        if (!data?.res || !userId) {
            return null
        }
        if (Number(data?.res?.initiator?.userId) === Number(userId)) {
            return Number(data?.res?.consignedId)
        } else {
            return Number(data?.res?.initialId)
        }
    }, [data?.res, userId])

    const { data: dataTestimonials, refetch: refetchTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: idBarter!,
            }),
        queryKey: ["testimonials", `barter=${idBarter}`, `offer=${offerId!}`],
        enabled:
            ["executed", "destroyed", "completed"]?.includes(
                data?.res?.status!,
            ) && !!offerId,
    })

    const isMeInitiator = useMemo(() => {
        return userId && data?.res?.initiator?.userId === userId
    }, [data?.res, userId])

    const infoOffers = useMemo(() => {
        if (!categories.length || !data?.res) {
            return null
        }

        return {
            initiator: categories?.find(
                (item) =>
                    Number(item.id) ===
                    Number(data?.res?.initiator?.categoryId),
            ),
            consigner: categories?.find(
                (item) =>
                    Number(item.id) ===
                    Number(data?.res?.consigner?.categoryId),
            ),
        }
    }, [categories, data?.res])

    const geo = useMemo(() => {
        return (
            userData?.addresses?.find((item) => item?.addressType === "main") ||
            null
        )
    }, [userData])

    const isFeedback = useMemo(() => {
        return dataTestimonials?.res?.some(
            (item) => item?.userId === userId && item?.barterId === idBarter,
        )
    }, [userId, idBarter, dataTestimonials?.res])

    useEffect(() => {
        if (!!data?.res) {
            requestAnimationFrame(() => {
                setIsLoadingFullInfo(true)
            })
        }
    }, [data, setIsLoadingFullInfo])

    function handleSuccess() {
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
                        const message = `Пользователь @${user?.username} согласился принять ваш запрос на обмен!`
                        console.log(
                            "%c socket?.connected: ",
                            `color: #${socket?.connected ? "0f0" : "f00"}`,
                            socket?.connected,
                        )
                        socket?.emit("chat", {
                            receiverIds: receiverIds,
                            message: message,
                            threadId: Number(threadId!),
                            created: date,
                            parentId: undefined,
                        })
                    }
                    setTimeout(() => {
                        refetch().finally(() => {
                            refetchThread()
                            setLoading(false)
                        })
                    }, 750)
                })
        }
    }

    function handleCanceled() {
        if (!loading) {
            setLoading(true)
            serviceBarters
                .patch(
                    {
                        updatedById: userId,
                        status: "canceled",
                    },
                    idBarter!,
                )
                .then((response) => {
                    refetch().finally(() => setLoading(false))
                })
        }
    }

    function handleCompleted() {
        console.log("%c data: ", "color: #ff0", {
            dataBarter: data?.res!,
            dataUser: userData!,
        })

        dispatchCompletion({
            visible: true,
            dataBarter: data?.res!,
            dataUser: userData!,
            threadId: Number(threadId),
        })
    }

    const textInfo = useMemo(() => {
        if (!infoOffers || !data?.res) return null
        const status = data?.res?.status!
        if (infoOffers && status === "initiated") {
            if (isMeInitiator) {
                return (
                    <p>
                        Вы предлагаете{" "}
                        <span>
                            {infoOffers?.initiator?.title?.toLowerCase()}
                        </span>{" "}
                        взамен вы хотите{" "}
                        <span>
                            {infoOffers?.consigner?.title?.toLowerCase()}
                        </span>
                    </p>
                )
            } else {
                return (
                    <p>
                        <span>{userData?.profile?.firstName}</span> предлагает
                        вам{" "}
                        <span>
                            {infoOffers?.consigner?.title?.toLowerCase()}
                        </span>{" "}
                        взамен на{" "}
                        <span>
                            {infoOffers?.initiator?.title?.toLowerCase()}
                        </span>
                    </p>
                )
            }
        }
        return status === "executed" ? (
            <p>
                В настоящее время у вас есть обмен с{" "}
                {userData?.profile?.firstName}
            </p>
        ) : status === "completed" ? (
            <p>
                Ваш обмен с {userData?.profile?.firstName} был успешно завершён!
            </p>
        ) : status === "destroyed" ? (
            <p>Ваш обмен с {userData?.profile?.firstName} не состоялся!</p>
        ) : status === "canceled" ? (
            <p>Ваш обмен с {userData?.profile?.firstName} был отклонён!</p>
        ) : null
    }, [infoOffers, data?.res, isMeInitiator, userData])

    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, visibility: "hidden" }}
                className={styles.wrapperMobile}
                data-destroyed={["canceled", "destroyed"]?.includes(
                    data?.res?.status!,
                )}
                id="id-barter-header"
            >
                <section>
                    <div data-sub-header>
                        <div
                            data-back
                            onClick={() => {
                                handleReplace("/messages")
                            }}
                        >
                            <Image
                                src="/svg/chevron-left.svg"
                                alt="chevron-left"
                                height={22}
                                width={22}
                            />
                        </div>
                        <div data-barter>
                            <BadgeServices
                                {...data?.res?.initiator!}
                                isClickable
                            />
                            <Image
                                src="/svg/repeat-white.svg"
                                alt="repeat-white"
                                width={18}
                                height={18}
                            />
                            <BadgeServices
                                {...data?.res?.consigner!}
                                isClickable
                            />
                        </div>
                        {userData ? (
                            <NextImageMotion
                                src={userData?.profile?.image?.attributes?.url}
                                alt="avatar"
                                width={40}
                                height={40}
                            />
                        ) : (
                            <div data-avatar />
                        )}
                    </div>
                    <div data-info>{textInfo}</div>
                    <footer>
                        {["executed", "completed", "destroyed"]?.includes(
                            data?.res?.status!,
                        ) &&
                        !isFeedback &&
                        dataTestimonials?.ok ? (
                            <div data-buttons>
                                <ButtonFill
                                    label={
                                        data?.res?.status === "completed"
                                            ? "Оставить отзыв"
                                            : "Завершить обмен"
                                    }
                                    handleClick={handleCompleted}
                                />
                            </div>
                        ) : null}
                        {isMeInitiator === false &&
                        data?.res?.status === "initiated" ? (
                            <>
                                <ButtonFill
                                    label="Принять"
                                    handleClick={handleSuccess}
                                    classNames={styles.fill}
                                    suffix={
                                        <Image
                                            src="/svg/check-white.svg"
                                            alt="check-white"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                />
                                <ButtonDefault
                                    classNames={styles.fill}
                                    label="Отказаться"
                                    handleClick={handleCanceled}
                                    suffix={
                                        <Image
                                            src="/svg/x-close-primary.svg"
                                            alt="check-white"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                />
                            </>
                        ) : null}
                    </footer>
                </section>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, visibility: "hidden" }}
            className={styles.wrapper}
            data-destroyed={["canceled", "destroyed"]?.includes(
                data?.res?.status!,
            )}
            id="id-barter-header"
        >
            <div data-sub-header>
                {data?.res?.timestamp ? (
                    <section data-time>
                        <Image
                            src="/svg/calendar-black.svg"
                            alt="calendar"
                            width={14}
                            height={14}
                        />
                        <p>
                            {dayjs(data?.res?.timestamp).format("DD/MM/YYYY")}
                        </p>
                    </section>
                ) : null}
                {geo ? (
                    <section data-time>
                        <GeoTagging
                            location={geo?.additional}
                            fontSize={12}
                            size={14}
                        />
                    </section>
                ) : null}
            </div>
            <section data-inform>{textInfo}</section>
            <footer data-executed>
                <div data-badges>
                    <BadgeServices {...data?.res?.initiator!} isClickable />
                    <Image
                        src="/svg/repeat-white.svg"
                        alt="repeat-white"
                        width={24}
                        height={24}
                    />
                    <BadgeServices {...data?.res?.consigner!} isClickable />
                </div>
                {["executed", "completed", "destroyed"]?.includes(
                    data?.res?.status!,
                ) &&
                !isFeedback &&
                dataTestimonials?.ok ? (
                    <div data-buttons>
                        <ButtonFill
                            label={
                                data?.res?.status === "completed"
                                    ? "Оставить отзыв"
                                    : "Завершить обмен"
                            }
                            handleClick={handleCompleted}
                        />
                    </div>
                ) : null}
                {isMeInitiator === false &&
                data?.res?.status === "initiated" ? (
                    <section>
                        <ButtonFill
                            label="Принять"
                            handleClick={handleSuccess}
                            classNames={styles.fill}
                            suffix={
                                <Image
                                    src="/svg/check-white.svg"
                                    alt="check-white"
                                    width={16}
                                    height={16}
                                />
                            }
                        />
                        <ButtonDefault
                            classNames={styles.fill}
                            label="Отказаться"
                            handleClick={handleCanceled}
                            suffix={
                                <Image
                                    src="/svg/x-close-primary.svg"
                                    alt="check-white"
                                    width={16}
                                    height={16}
                                />
                            }
                        />
                    </section>
                ) : null}
            </footer>
        </motion.div>
    )
}
