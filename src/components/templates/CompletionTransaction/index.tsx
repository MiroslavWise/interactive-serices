"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import type { IValuesForm } from "./types/types"

import { ButtonClose, ButtonFill } from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"
import { serviceTestimonials } from "@/services/testimonials"
import { useCompletionTransaction } from "@/store/state/useCompletionTransaction"

import styles from "./styles/style.module.scss"

export const CompletionTransaction = () => {
    const { userId } = useAuth()
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm<IValuesForm>({
        defaultValues: {
            rating: 5,
        },
    })
    const { visible, dataBarter, dataUser, dispatchCompletion } =
        useCompletionTransaction()

    const { refetch } = useQuery({
        queryFn: () => serviceBarters.getId(dataBarter?.id!),
        queryKey: ["barters", `id=${dataBarter?.id!}`],
        enabled: visible,
    })

    function submit(values: IValuesForm) {
        const idOffer =
            dataBarter?.initiator?.userId === userId
                ? dataBarter?.consignedId
                : dataBarter?.initialId
        serviceTestimonials
            .post({
                userId: userId!,
                targetId: idOffer!,
                provider: "offer",
                rating: values.rating.toString(),
                message: values.message,
                status: `barter-${dataBarter?.id!}-user-${userId!}`,
                enabled: true,
            })
            .then((response) => {
                console.log("serviceTestimonials response: ", response)
                if (
                    response?.ok &&
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
                                requestAnimationFrame(() => {
                                    refetch()
                                    dispatchCompletion({ visible: false })
                                })
                            })
                    })
                } else {
                    requestAnimationFrame(() => {
                        refetch()
                        dispatchCompletion({ visible: false })
                    })
                }
            })
    }

    const onSubmit = handleSubmit(submit)

    return visible ? (
        <div className={styles.wrapper} data-visible={visible}>
            <motion.form
                initial={{ top: "30%", opacity: 0, visibility: "hidden" }}
                animate={{ top: "40%", opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.5 }}
                exit={{ top: "30%", opacity: 0, visibility: "hidden" }}
                onSubmit={onSubmit}
            >
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
                <section>
                    <div data-groups>
                        <textarea
                            {...register("message", {
                                required: true,
                                minLength: 5,
                            })}
                            onKeyDown={(event) => {
                                if (
                                    event.keyCode === 13 ||
                                    event.code === "Enter"
                                ) {
                                    onSubmit()
                                }
                            }}
                            placeholder="Оставте отзыв о совершённом обмене, или какие у вас остались впечатления о человеке?"
                        />
                        {errors?.message ? <i>Минимум 5 символов</i> : null}
                    </div>
                    <div data-groups>
                        <div
                            data-rating
                            {...register("rating", { required: false })}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
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
