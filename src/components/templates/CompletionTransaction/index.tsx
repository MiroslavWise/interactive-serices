"use client"

import { flushSync } from "react-dom"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { IValuesForm } from "./types/types"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useWebSocket } from "@/context"
import { serviceTestimonials, serviceThreads, serviceBarters, serviceNotifications } from "@/services"
import { useAuth, useAddTestimonials, dispatchAddTestimonials } from "@/store"

import styles from "./styles/style.module.scss"

export const CompletionTransaction = () => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        reset,
    } = useForm<IValuesForm>({
        defaultValues: {
            rating: 3,
        },
    })
    const visible = useAddTestimonials(({ visible }) => visible)
    const profile = useAddTestimonials(({ profile }) => profile)
    const barterId = useAddTestimonials(({ barterId }) => barterId)
    const threadId = useAddTestimonials(({ threadId }) => threadId)
    const testimonials = useAddTestimonials(({ testimonials }) => testimonials)
    const notificationId = useAddTestimonials(({ notificationId }) => notificationId)

    const { data, refetch: refetchBarters } = useQuery({
        queryFn: () => serviceBarters.getId(barterId!),
        queryKey: ["barters", { id: barterId }],
        enabled: !!barterId,
    })

    const { refetch: refetchThread } = useQuery({
        queryFn: () => serviceThreads.getId(Number(threadId)),
        queryKey: ["threads", `user=${userId}`, `id=${threadId}`],
        enabled: false,
    })

    const { refetch: refetchNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: false,
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

    const { refetch: refetchTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: barterId!,
            }),
        queryKey: ["testimonials", { targetId: offerId, provider: "offer", barterId: barterId }],
        enabled: false,
    })

    const isLastFeedback = useMemo(() => {
        return !!testimonials?.filter((item) => item?.barterId === barterId)?.length
    }, [barterId, testimonials])

    function submit(values: IValuesForm) {
        if (!loading) {
            setLoading(true)
            const idOffer = data?.res?.initiator?.userId === userId ? data?.res?.consignedId : data?.res?.initialId
            Promise.all([
                serviceTestimonials.post({
                    targetId: idOffer!,
                    provider: "offer",
                    barterId: barterId!,
                    rating: values.rating!,
                    message: values.message,
                    status: "published",
                    enabled: true,
                }),
                !!notificationId
                    ? serviceNotifications.patch({ operation: "feedback-received", enabled: true }, notificationId)
                    : Promise.resolve({ ok: true }),
            ]).then(async (responses) => {
                if (responses?.some((item) => item.ok)) {
                    const message = isLastFeedback ? "last" : "not-last"

                    flushSync(async () => {
                        Promise.all([refetchBarters(), refetchTestimonials(), refetchThread(), refetchNotifications()]).then(() => {
                            setLoading(false)
                            dispatchAddTestimonials({ visible: false })
                        })
                    })
                }
            })
        }
    }

    const onSubmit = handleSubmit(submit)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible} data-mobile={isMobile}>
            <section data-section-modal>
                <ButtonClose onClick={() => dispatchAddTestimonials({ visible: false })} position={{}} />
                <header>
                    <h3>Отзыв об обмене с {profile?.firstName || " "}</h3>
                </header>
                <form onSubmit={onSubmit}>
                    <div data-text data-limit={watch("message")?.length > 200}>
                        <textarea
                            {...register("message", {
                                required: true,
                                minLength: 5,
                            })}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13 || event.code === "Enter") {
                                    onSubmit()
                                }
                            }}
                            placeholder="Напишите свой отзыв"
                            maxLength={240}
                        />
                        <sup>
                            <span>{watch("message")?.length || 0}</span>/240
                        </sup>
                    </div>
                    <div data-groups>
                        <div data-rating {...register("rating", { required: false })}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <button
                                    type="button"
                                    data-img
                                    key={`::star::${item}::`}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setValue("rating", item)
                                    }}
                                >
                                    <img
                                        data-number={watch("rating")}
                                        data-active={item <= watch("rating")}
                                        src="/svg/stars/star-fill.svg"
                                        alt="star"
                                        height={20}
                                        width={20}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button type="submit" typeButton="fill-primary" label="Отправить" loading={loading} />
                </form>
            </section>
        </div>
    )
}
