"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentForgotPassword } from "../types/types"

import { Button, Segments } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import {
    dispatchAuthModal,
    dispatchAuthModalCreatePassword,
    dispatchAuthModalVerification,
    dispatchIModalAuthEmailOrPhone,
    dispatchStartTimer,
    useModalAuthEmailOrPhone,
} from "@/store/hooks"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"

import styles from "../styles/form.module.scss"
import { VALUES_EMAIL_PHONE } from "../constants/segments"

export const ContentForgotPassword: TContentForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const { on } = useToast()
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IValues>()

    const onEnter = async (values: IValues) => {
        setLoading(true)
        useForgotPasswordHelper
            .forgotPassword({ email: values.email })
            .then((response) => {
                if (response.ok && !!response?.res) {
                    dispatchAuthModalCreatePassword({
                        email: values.email,
                        phone: values.phone,
                    })
                    dispatchStartTimer()
                    // dispatchAuthModalVerification({})
                    on({
                        message: "Войдите на свою почту. Мы выслали ват ссылку для восстановления пароля!",
                    })
                }
                if (response?.error?.code === 401) {
                    setError("email", { message: "user is not verified" })
                    on({ message: "Пользователь не верифицирован!" }, "error")
                    dispatchAuthModal({ visible: false })
                }
                if (response?.error?.code === 404) {
                    setError("email", { message: "user not found" })
                    on({ message: "Пользователя не существует!" }, "error")
                    dispatchAuthModal({ visible: false })
                }
                if (response?.code && response?.code >= 500 && response?.code <= 599) {
                    setError("email", { message: "something went wrong" })
                }
            })
            .finally(() => {
                setLoading(false)
            })
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
                    name={typeEmailOrPhone}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div data-label-input>
                            <label htmlFor={field.name}>
                                {field.name === "email" ? "Электронная почта" : field.name === "phone" ? "Телефон" : ""}
                            </label>
                            <input
                                data-error={field.name === "email" ? !!errors.email : field.name === "phone" ? !!errors.phone : null}
                                type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                                inputMode={field.name === "email" ? "email" : field.name === "phone" ? "numeric" : "text"}
                                placeholder={
                                    field.name === "email" ? "email_address@mail.com" : field.name === "phone" ? "+7 (000) 000-00-00" : ""
                                }
                                {...field}
                                pattern={field.name === "phone" ? "[0-9]*" : field.name === "email" ? "[a-zA-Z@.]*" : undefined}
                            />
                            {errors.email ? (
                                <i>
                                    {errors.email && errors?.email?.message === "user is not verified"
                                        ? "Пользователь не верифицирован"
                                        : errors.email && errors?.email?.message === "user not found"
                                        ? "Пользователя не существует"
                                        : errors.email && errors?.email?.message === "something went wrong"
                                        ? "У нас проблемы с сервером, извините :("
                                        : errors.email
                                        ? "Требуется email"
                                        : ""}
                                </i>
                            ) : errors.phone ? (
                                <i>
                                    {errors.phone && errors?.phone?.message === "user is not verified"
                                        ? "Пользователь не верифицирован"
                                        : errors.phone && errors?.phone?.message === "user not found"
                                        ? "Пользователя не существует"
                                        : errors.email && errors?.phone?.message === "something went wrong"
                                        ? "У нас проблемы с сервером, извините :("
                                        : errors.email
                                        ? "Требуется номер"
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
