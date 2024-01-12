"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import type { TContentCodeVerification } from "../types/types"

import { TimerData } from "./TimerData"
import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { dispatchAuthModal, useAuth, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentCodeVerification: TContentCodeVerification = ({}) => {
    const [loading, setLoading] = useState(false)
    const phone = useModalAuth(({ phone }) => phone)
    const idUser = useModalAuth(({ idUser }) => idUser)
    const setToken = useAuth(({ setToken }) => setToken)

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
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
            serviceAuth
                .sms({
                    code: values.code!,
                    id: idUser!,
                })
                .then((response) => {
                    console.log("response: serviceAuth: sms: ", response)
                    if (response.ok) {
                        if (response?.res) {
                            dispatchAuthModal({
                                visible: false,
                                type: null,
                            })
                            setToken({
                                ok: true,
                                token: response?.res?.accessToken!,
                                refreshToken: response?.res?.refreshToken!,
                                expires: response?.res?.expires!,
                                userId: response?.res?.id!,
                                email: "",
                            })
                        }
                    } else {
                        console.log("%c ---ERROR CONFIRM CODE---", "color: #f00", response?.error)
                        setError("code", { message: "Не верный код" })
                        setLoading(false)
                    }
                })
        }
    }

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Отправили проверочный код на номер</p>
                <b>{phone}</b>
            </article>
            <form onSubmit={handleSubmit(handleConfirmation)}>
                <section className={styles.section}>
                    <Controller
                        name="code"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Введите 6 символов",
                            },
                            minLength: 6,
                            maxLength: 6,
                        }}
                        render={({ field }) => (
                            <div data-label-input>
                                <label htmlFor={field.name}>Код из СМС</label>
                                <input
                                    data-error={!!errors.code}
                                    placeholder="Введите код из СМС-сообщения"
                                    maxLength={6}
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    {...field}
                                />
                                {!!errors?.code ? <i>{errors?.code?.message}</i> : null}
                            </div>
                        )}
                    />
                    <TimerData />
                </section>
                <footer data-buttons>
                    <Button
                        type="button"
                        typeButton="regular-primary"
                        label="Изменить номер"
                        onClick={handleChange}
                        loading={loading}
                        disabled={loading}
                    />
                    <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} disabled={loading} />
                </footer>
            </form>
        </div>
    )
}

interface IValues {
    code: string
}
