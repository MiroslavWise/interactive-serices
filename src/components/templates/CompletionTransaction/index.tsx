"use client"

import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useEffect, useMemo, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IValuesForm } from "./types/types"

import { Button, ButtonClose, ButtonLink } from "@/components/common"

import { cx } from "@/lib/cx"
import { useAuth, useAddTestimonials, dispatchAddTestimonials } from "@/store"
import { serviceTestimonials, serviceThreads, serviceBarters, serviceNotifications } from "@/services"

import styles from "./styles/style.module.scss"

export const CompletionTransaction = () => {
    const [isFirst, setIsFirst] = useState(true)
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        setFocus,
    } = useForm<IValuesForm>({
        defaultValues: {
            rating: 3,
        },
    })
    const visible = useAddTestimonials(({ visible }) => visible)
    const profile = useAddTestimonials(({ profile }) => profile)
    const barterId = useAddTestimonials(({ barterId }) => barterId)
    const threadId = useAddTestimonials(({ threadId }) => threadId)
    const notificationId = useAddTestimonials(({ notificationId }) => notificationId)

    const [files, setFiles] = useState<File[]>([])
    const [strings, setStrings] = useState<string[]>([])

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

    useEffect(() => {
        if (visible) {
            setFocus("message")
        }
    }, [visible])

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
                    ? serviceNotifications.patch(
                          {
                              operation:
                                  data?.res?.status === "completed"
                                      ? "feedback-received"
                                      : data?.res?.status?.includes("destroyed")
                                      ? "feedback-received-no"
                                      : "feedback-received",
                              enabled: true,
                              read: true,
                          },
                          notificationId,
                      )
                    : Promise.resolve({ ok: true }),
            ]).then(async (responses) => {
                if (responses?.some((item) => item!?.ok)) {
                    refetchBarters()
                    refetchTestimonials()
                    refetchThread()
                    refetchNotifications()
                    flushSync(async () => {
                        setIsFirst(false)
                        setLoading(false)
                    })
                }
            })
        }
    }

    const onSubmit = handleSubmit(submit)

    console.log("errors: ", errors)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section>
                <h5>Обзор</h5>
                <ButtonClose onClick={() => dispatchAddTestimonials({ visible: false })} position={{}} />
                <div data-dots>
                    <img src="/svg/dots-vertical-gray.svg" alt="..." width={16} height={16} />
                </div>
                {isFirst ? (
                    <form onSubmit={onSubmit}>
                        <header>
                            <h3>
                                Добавьте отзыв <span>@{profile?.username}</span>
                            </h3>
                            <div data-rating>
                                <p>Оцените качество услуг:</p>
                                <div data-groups>
                                    <div data-rating {...register("rating", { required: false })}>
                                        {[1, 2, 3, 4, 5].map((item) => (
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
                                                    src="/svg/star-01.svg"
                                                    alt="star"
                                                    height={20}
                                                    width={20}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </header>
                        <fieldset>
                            <div data-text data-limit={watch("message")?.length > 200}>
                                <textarea
                                    {...register("message", {
                                        required: true,
                                    })}
                                    onKeyDown={(event) => {
                                        if (event.keyCode === 13 || event.code === "Enter") {
                                            onSubmit()
                                        }
                                    }}
                                    placeholder="Напишите здесь свой отзыв..."
                                    maxLength={1024}
                                />
                                <sup>
                                    <span>{watch("message")?.length || 0}</span>/240
                                </sup>
                            </div>
                        </fieldset>
                        <Button type="submit" typeButton="fill-primary" label="Отправить" loading={loading} />
                    </form>
                ) : (
                    <article>
                        <div data-img>
                            <img src="/svg/fi_1271380.svg" alt="fi" width={100} height={100} />
                        </div>
                        <div data-text>
                            <h2>Спасибо, что делитесь мнением с Шейрой!</h2>
                            <p>Ваш отзыв будет опубликован после проверки.</p>
                        </div>
                        <ButtonLink
                            typeButton="fill-primary"
                            label="Вернуться в профиль"
                            href={{ pathname: "/user", query: { id: profile?.userId! } }}
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchAddTestimonials({ visible: false })
                            }}
                        />
                    </article>
                )}
            </section>
        </div>
    )
}
