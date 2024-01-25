"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import type { TTypeReason } from "@/services/barters/types"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { MENU_REASON } from "./constants/constants"
import { serviceBarters, serviceNotifications } from "@/services"
import { dispatchReasonBarters, useAuth, useReasonBarters } from "@/store"

import styles from "./styles/style.module.scss"

export const ReasonBarters = () => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const visible = useReasonBarters(({ visible }) => visible)
    const barterId = useReasonBarters(({ barterId }) => barterId)
    const notificationId = useReasonBarters(({ notificationId }) => notificationId)
    const {
        setValue,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IValuesForm>({})

    const { refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: false,
    })

    const { refetch: refetchBarter } = useQuery({
        queryFn: () => serviceBarters.getId(barterId!),
        queryKey: ["barters", { id: barterId }],
        enabled: false,
    })

    function handleSend({ type, text }: IValuesForm) {
        if (!loading) {
            setLoading(true)
            let textReason = text

            if (type !== "other") {
                textReason = MENU_REASON.find((item) => item?.value === type)?.label!
            }

            // reason: textReason

            Promise.all([
                serviceNotifications.patch({ enabled: true, operation: "completion-no", read: true }, notificationId!),
                serviceBarters.patch({ enabled: true, status: `destroyed:${userId}`, title: textReason }, barterId!),
            ]).then(() => {
                refetch()
                refetchBarter()
                flushSync(() => {
                    handleClose()
                    setLoading(false)
                })
            })
        }
    }

    const onSubmit = handleSubmit(handleSend)

    function handleClose() {
        dispatchReasonBarters({ visible: false, notificationId: undefined, barterId: undefined })
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section data-section-modal>
                <h2>Пожалуйста, укажите причину несостоявшегося обмена</h2>
                <ButtonClose position={{}} onClick={handleClose} />
                <form onSubmit={onSubmit}>
                    <div data-content>
                        <p>Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей</p>
                        <ul {...register("type", { required: true })}>
                            {MENU_REASON.map((item) => (
                                <fieldset key={`::key::reason::menu::${item.value}::`}>
                                    <div
                                        data-check={watch("type") === item.value}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setValue("type", item.value!)
                                        }}
                                    />
                                    <label>{item.label}</label>
                                </fieldset>
                            ))}
                            {watch("type") === "other" ? (
                                <div data-text-area>
                                    <textarea {...register("text", { required: watch("type") === "other" })} placeholder="Опишите причину своими словами..." />
                                    <sup>
                                        <span>{watch("text")?.length || 0}</span>/400
                                    </sup>
                                </div>
                            ) : null}
                        </ul>
                    </div>
                    <footer>
                        <Button
                            type="button"
                            typeButton="regular-primary"
                            label="Закрыть"
                            onClick={(event) => {
                                event.stopPropagation()
                                handleClose()
                            }}
                        />
                        <Button
                            type="submit"
                            typeButton="fill-primary"
                            label="Отправить"
                            loading={loading}
                            disabled={!watch("type") || (watch("type") === "other" && !watch("text"))}
                        />
                    </footer>
                </form>
            </section>
        </div>
    )
}

interface IValuesForm {
    type: TTypeReason
    text: string
}
