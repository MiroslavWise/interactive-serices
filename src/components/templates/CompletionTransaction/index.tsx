"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { IValuesForm } from "./types/types"

import { Button, ButtonClose } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"

import { cx } from "@/lib/cx"
import { useWebSocket } from "@/context"
import { serviceBarters } from "@/services/barters"
import { serviceThreads } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { serviceTestimonials } from "@/services/testimonials"
import { useAuth, useAddTestimonials, dispatchAddTestimonials } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import { flushSync } from "react-dom"

export const CompletionTransaction = () => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const { on } = useToast()
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
    const { socket } = useWebSocket()
    const user = useAddTestimonials(({ user }) => user)
    const barter = useAddTestimonials(({ barter }) => barter)
    const visible = useAddTestimonials(({ visible }) => visible)
    const threadId = useAddTestimonials(({ threadId }) => threadId)
    const testimonials = useAddTestimonials(({ testimonials }) => testimonials)

    const { refetch: refetchBarters } = useQuery({
        queryFn: () => serviceBarters.getId(barter?.id!),
        queryKey: ["barters", `id=${barter?.id!}`],
        enabled: false,
    })

    const { refetch: refetchThread } = useQuery({
        queryFn: () => serviceThreads.getId(Number(threadId)),
        queryKey: ["threads", `user=${userId}`, `id=${threadId}`],
        enabled: false,
    })

    const offerId: number | null = useMemo(() => {
        if (!barter || !userId) {
            return null
        }
        if (Number(barter?.initiator?.userId) === Number(userId)) {
            return Number(barter?.consignedId)
        } else {
            return Number(barter?.initialId)
        }
    }, [barter, userId])

    const { refetch: refetchTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: barter?.id!,
            }),
        queryKey: ["testimonials", `barter=${barter?.id}`, `offer=${offerId!}`],
        enabled: false,
    })

    const isLastFeedback = useMemo(() => {
        return !!testimonials?.filter((item) => item?.barterId === barter?.id)?.length
    }, [barter?.id, testimonials])

    function submit(values: IValuesForm) {
        const idOffer = barter?.initiator?.userId === userId ? barter?.consignedId : barter?.initialId

        Promise.all([
            serviceTestimonials.post({
                targetId: idOffer!,
                provider: "offer",
                barterId: barter?.id!,
                rating: values.rating?.toString(),
                message: values.message,
                status: "published",
                enabled: true,
            }),
            isLastFeedback ? serviceThreads.patch({ enabled: false }, threadId!) : Promise.resolve({ ok: true }),
            serviceBarters.patch({ updatedById: userId!, status: "completed" }, barter?.id!),
        ]).then(async (responses) => {
            if (responses?.some((item) => item.ok)) {
                const message = isLastFeedback ? "last" : "not-last"
                socket?.emit("barter", {
                    receiverIds: [user?.id!],
                    message: message,
                    barterId: barter?.id,
                    emitterId: userId!,
                    status: "completed",
                    threadId: threadId!,
                    created: new Date(),
                })
                flushSync(async () => {
                    await refetchBarters()
                    await refetchTestimonials()
                    await refetchThread()
                    dispatchAddTestimonials({ visible: false })
                })
            }
        })
    }

    const onSubmit = handleSubmit(submit)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible} data-mobile={isMobile}>
            <section data-section-modal>
                <ButtonClose onClick={() => dispatchAddTestimonials({ visible: false })} position={{}} />
                <header>
                    <h3>Отзыв об обмене с {user?.profile?.firstName || " "}</h3>
                </header>
                <form onSubmit={onSubmit}>
                    <div data-text>
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
                            maxLength={512}
                        />
                        <sup>{watch("message")?.length || 0}/512</sup>
                    </div>
                    <div data-groups>
                        <div data-rating {...register("rating", { required: false })}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <img
                                    data-number={watch("rating")}
                                    data-active={item <= watch("rating")}
                                    src="/svg/stars/star-fill.svg"
                                    onClick={() => setValue("rating", item)}
                                    alt="star"
                                    key={`${item}-start`}
                                    height={20}
                                    width={20}
                                />
                            ))}
                        </div>
                    </div>
                    <Button type="submit" typeButton="fill-primary" label="Отправить" loading={loading} />
                </form>
            </section>
        </div>
    )
}
