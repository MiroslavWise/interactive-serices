"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentForgotPassword } from "../types/types"

import { Button, Segments } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
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
                    name={typeEmailOrPhone}
                    control={control}
                    rules={{ required: true }}
                    render={({ field, formState }) => (
                        <div data-label-input>
                            <label htmlFor={field.name}>
                                {field.name === "email" ? "Электронная почта" : field.name === "phone" ? "Телефон" : ""}
                            </label>
                            <input
                                data-error={
                                    field.name === "email"
                                        ? !!formState.errors.email
                                        : field.name === "phone"
                                        ? !!formState.errors.phone
                                        : null
                                }
                                type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                                inputMode={field.name === "email" ? "email" : field.name === "phone" ? "numeric" : "text"}
                                placeholder={
                                    field.name === "email" ? "email_address@mail.com" : field.name === "phone" ? "+7 (000) 000-00-00" : ""
                                }
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
                            ) : formState.errors.phone ? (
                                <i>
                                    {formState.errors.phone && formState.errors?.phone?.message === "user is not verified"
                                        ? "Пользователь не верифицирован"
                                        : formState.errors.phone && formState.errors?.phone?.message === "user not found"
                                        ? "Пользователя не существует"
                                        : formState.errors.email && formState.errors?.phone?.message === "something went wrong"
                                        ? "У нас проблемы с сервером, извините :("
                                        : formState.errors.email
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
