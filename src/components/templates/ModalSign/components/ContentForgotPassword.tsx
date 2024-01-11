"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentForgotPassword } from "../types/types"

import { Button, Segments } from "@/components/common"

import { dispatchAuthModal, useModalAuthEmailOrPhone, dispatchIModalAuthEmailOrPhone, useModalAuth } from "@/store/hooks"
import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"

import styles from "../styles/form.module.scss"

export const ContentForgotPassword: TContentForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const email = useModalAuth(({ email }) => email)
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const { control, handleSubmit, setError } = useForm<IValues>({ defaultValues: { email: email } })

    const onEnter = async (values: IValues) => {
        setLoading(true)
        if (values.email) {
            useForgotPasswordHelper
                .forgotPassword({ email: values.email })
                .then((response) => {
                    if (response.ok && !!response?.res) {
                        dispatchAuthModal({
                            type: "InformationEmailReset",
                            email: values.email,
                        })
                    }
                    if (response?.error?.code === 401) {
                        setError("email", { message: "user is not verified" })
                        setError("phone", { message: "user is not verified" })
                    }
                    if (response?.error?.code === 404) {
                        setError("email", { message: "user not found" })
                        setError("phone", { message: "user not found" })
                    }
                    if (response?.code && response?.code >= 500 && response?.code <= 599) {
                        setError("email", { message: "something went wrong" })
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <div className={styles.content}>
            <Segments
                type="primary"
                VALUES={VALUES_EMAIL_PHONE}
                active={VALUES_EMAIL_PHONE.find((item) => item.value === typeEmailOrPhone)!}
                setActive={(event) => {
                    dispatchIModalAuthEmailOrPhone(event.value)
                }}
                isBorder
            />
            <form onSubmit={handleSubmit(onEnter)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, formState }) => (
                        <div data-label-input>
                            <label htmlFor="email">Электронная почта</label>
                            <input
                                data-error={!!formState.errors.email}
                                type="email"
                                inputMode="email"
                                placeholder="email_address@mail.com"
                                {...field}
                            />
                            {formState.errors.email ? (
                                <i>
                                    {formState.errors.email && formState.errors?.email?.message === "user is not verified"
                                        ? "Пользователь не верифицирован"
                                        : formState.errors.email && formState.errors?.email?.message === "user not found"
                                        ? "Пользователя не существует"
                                        : formState.errors.email && formState.errors?.email?.message === "something went wrong"
                                        ? "У нас проблемы с сервером, извините :("
                                        : formState.errors.email
                                        ? "Требуется email"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                    )}
                />
                <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} />
            </form>
            <article data-column>
                <p>
                    Уже есть аккаунт? <a onClick={() => dispatchAuthModal({ type: "SignIn" })}>Войти</a>
                </p>
            </article>
        </div>
    )
}

interface IValues {
    email: string
    phone: string
}
