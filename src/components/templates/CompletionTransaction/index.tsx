"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { IValuesForm } from "./types/types"

import { ButtonClose, ButtonFill } from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"
import { serviceThreads } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { serviceTestimonials } from "@/services/testimonials"
import { TextArea } from "@/components/common/Inputs/components/TextArea"
import { useCompletionTransaction } from "@/store/state/useCompletionTransaction"

import styles from "./styles/style.module.scss"

export const CompletionTransaction = () => {
    const { userId } = useAuth()
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
    const { visible, dataBarter, dataUser, dispatchCompletion, threadId } =
        useCompletionTransaction()

    const { refetch } = useQuery({
        queryFn: () => serviceBarters.getId(dataBarter?.id!),
        queryKey: ["barters", `id=${dataBarter?.id!}`],
        enabled: false,
    })
    const { refetch: refetchThreads } = useQuery({
        queryFn: () => serviceThreads.getId(threadId!),
        queryKey: ["threads", `user=${userId}`, `id=${threadId}`],
        enabled: false,
    })

    const offerId: number | null = useMemo(() => {
        if (!dataBarter || !userId) {
            return null
        }
        if (Number(dataBarter?.initiator?.userId) === Number(userId)) {
            return Number(dataBarter?.consignedId)
        } else {
            return Number(dataBarter?.initialId)
        }
    }, [dataBarter, userId])

    const { refetch: refetchTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: dataBarter?.id!,
            }),
        queryKey: [
            "testimonials",
            `offer=${offerId!}`,
            `barter=${dataBarter?.id}`,
            `provider=offer`,
        ],
        enabled: false,
    })

    function submit(values: IValuesForm) {
        const idOffer =
            dataBarter?.initiator?.userId === userId
                ? dataBarter?.consignedId
                : dataBarter?.initialId

        Promise.all([
            serviceTestimonials.post({
                userId: userId!,
                targetId: idOffer!,
                provider: "offer",
                barterId: dataBarter?.id!,
                rating: values.rating?.toString(),
                message: values.message,
                status: "published",
                enabled: true,
            }),
            serviceThreads.patch(
                {
                    title: "completed",
                    enabled: false,
                },
                threadId!,
            ),
        ]).then(async (responses) => {
            await refetchThreads()
            if (responses[0]) {
                console.log("serviceTestimonials response: ", responses[0])
                if (
                    responses[0]?.ok &&
                    !["completed", "destroyed"].includes(dataBarter?.status!)
                ) {
                    requestAnimationFrame(() => {
                        serviceBarters
                            .patch(
                                {
                                    updatedById: userId!,
                                    status: "completed",
                                },
                                dataBarter?.id!,
                            )
                            .then((res) => {
                                console.log("serviceBarters response: ", res)
                                if (res.ok) {
                                    on(
                                        `Ваш отзыв поможет улучшить качество услуг ${dataUser?.profile?.firstName}, спасибо :)`,
                                        "barter",
                                    )
                                } else {
                                    on(
                                        `Ваш отзыв не был доставлен пользователю ${dataUser?.profile?.firstName}, у нас проблемы на сервере`,
                                        "error",
                                    )
                                }
                                requestAnimationFrame(() => {
                                    refetch().finally(() => {
                                        refetchTestimonials()
                                        reset()
                                        dispatchCompletion({
                                            visible: false,
                                        })
                                    })
                                })
                            })
                    })
                } else {
                    if (responses[0]?.ok) {
                        on(
                            `Ваш отзыв поможет улучшить качество услуг ${dataUser?.profile?.firstName}, спасибо :)`,
                            "barter",
                        )
                    } else {
                        on(
                            `Ваш отзыв не был доставлен пользователю ${dataUser?.profile?.firstName}, у нас проблемы на сервере`,
                            "error",
                        )
                    }
                    requestAnimationFrame(() => {
                        refetch().finally(() => {
                            refetchTestimonials()
                            reset()
                            dispatchCompletion({ visible: false })
                        })
                    })
                }
            }
        })
    }

    const onSubmit = handleSubmit(submit)

    return visible ? (
        <div
            className={styles.wrapper}
            data-visible={visible}
            data-mobile={isMobile}
        >
            <motion.form onSubmit={onSubmit}>
                <ButtonClose
                    onClick={() => dispatchCompletion({ visible: false })}
                    position={{ top: 12, right: 12 }}
                />
                <h2>
                    Отзыв о бартере с{" "}
                    <span>
                        {dataUser?.profile?.firstName || " "}{" "}
                        {dataUser?.profile?.lastName}
                    </span>
                </h2>
                <h5>
                    Внимание!!! Завершая бартер, вы автоматически удалите чат.
                    Ваш собеседник сможет оставить уже только отзыв
                </h5>
                <section>
                    <div data-groups>
                        <TextArea
                            {...register("message", {
                                required: true,
                                minLength: 5,
                            })}
                            value={watch("message")}
                            onKeyDown={(event) => {
                                if (
                                    event.keyCode === 13 ||
                                    event.code === "Enter"
                                ) {
                                    onSubmit()
                                }
                            }}
                            maxLength={512}
                            placeholder="Оставте отзыв о совершённом обмене, или какие у вас остались впечатления о человеке?"
                        />
                        {errors?.message ? <i>Минимум 5 символов</i> : null}
                    </div>
                    <div data-groups>
                        <div
                            data-rating
                            {...register("rating", { required: false })}
                        >
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Image
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
                </section>
                <ButtonFill
                    label="Отправить отзыв"
                    type="primary"
                    submit="submit"
                />
            </motion.form>
        </div>
    ) : null
}
