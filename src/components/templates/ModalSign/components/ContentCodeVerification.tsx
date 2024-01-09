"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import type { TContentCodeVerification } from "../types/types"

import { TimerData } from "./TimerData"
import { Button } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"
import { serviceAuth } from "@/services/auth"

export const ContentCodeVerification: TContentCodeVerification = ({}) => {
    const [loading, setLoading] = useState(false)
    const phone = useModalAuth(({ phone }) => phone)
    const email = useModalAuth(({ email }) => email)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({
        defaultValues: {
            code: "",
        },
    })

    function handleChange() {
        dispatchAuthModal({
            visible: true,
            type: "SignUp",
        })
    }

    function handleConfirmation(values: IValues) {
        if (!loading) {
            setLoading(true)
            serviceAuth.sms(values.code!).then((response) => {
                console.log("response: serviceAuth: sms: ", response)
                if (response.ok) {
                    dispatchAuthModal({
                        type: "SignIn",
                    })
                } else {
                    dispatchAuthModal({
                        type: "SignUp",
                    })
                }
            })
        }
    }

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Отправили проверочный код на {!!email ? "почту" : !!phone ? "номер" : null}</p>
                <b>{phone ? phone : email ? email : null}</b>
            </article>
            <form onSubmit={handleSubmit(handleConfirmation)}>
                <section className={styles.section}>
                    <Controller
                        name="code"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <div data-label-input>
                                <label htmlFor="email">Код из {!!email ? "письма" : !!phone ? "СМС" : null}</label>
                                <input
                                    data-error={!!errors.code}
                                    placeholder={`Введите код из ${!!email ? "письма" : !!phone ? "СМС-сообщения" : ""}`}
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    {...field}
                                />
                            </div>
                        )}
                    />
                    <TimerData />
                </section>
                <footer data-buttons>
                    <Button
                        type="button"
                        typeButton="regular-primary"
                        label={`Изменить ${!!email ? "адрес" : !!phone ? "номер" : null}`}
                        onClick={handleChange}
                        loading={loading}
                        disabled={loading}
                    />
                    <Button type="submit" typeButton="fill-primary" label="Подтвердить" loading={loading} disabled={loading} />
                </footer>
            </form>
        </div>
    )
}

interface IValues {
    code: string
}
