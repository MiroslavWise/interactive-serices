"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"

import type { TContentResetPassword } from "../types/types"

import { InputPassword, Button } from "@/components/common"

import {
    usePush,
    checkPasswordStrength,
    useForgotPasswordHelper,
} from "@/helpers"
import { useModalAuth } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "../styles/form.module.scss"

interface IValues {
    password: string
    repeat_password: string
}

export const ContentResetPassword: TContentResetPassword = ({}) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const dispatchAuthModal = useModalAuth(({dispatchAuthModal}) => dispatchAuthModal)
    const {
        register,
        watch,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IValues>()
    const searchParams = useSearchParams()
    const passwordResetToken = searchParams?.get("password-reset-token")
    const { handleReplace } = usePush()

    const submit = (values: IValues) => {
        setLoading(true)
        useForgotPasswordHelper
            .resetPassword({
                token: passwordResetToken!,
                password: values.password,
                repeat: values.repeat_password,
            })
            .then((response) => {
                if (response.code === 400) {
                    setError("password", { message: "no_repeat" })
                    setError("repeat_password", { message: "no_repeat" })
                    return
                }
                if ([401 || 403].includes(response?.code!)) {
                    on(
                        { message: "Время восстановления пароля истекло" },
                        "warning",
                    )
                    handleReplace("/")
                    return
                }
                if (response.code === 500) {
                    on(
                        {
                            message:
                                "Извините, у нас какиe-то ошибки. Мы работаем над этим :(",
                        },
                        "error",
                    )
                }
                if (response.ok && !!response?.res) {
                    on(
                        {
                            message:
                                "Пароль успешно изменён. Вы можете войти на аккаунт!",
                        },
                        "success",
                    )
                    handleReplace("/")
                    dispatchAuthModal({ type: "SignIn" })
                    return
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <section className={styles.section}>
                    <InputPassword
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        {...register("password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                checkPasswordStrength(value)
                                    ? true
                                    : "validate_register",
                        })}
                        value={watch("password")}
                        onChange={(event) =>
                            setValue("password", event.target.value)
                        }
                        error={
                            errors.password?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Подтвердите пароль"
                        rules
                        placeholder="Введите пароль еще раз"
                        {...register("repeat_password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                value === watch("password")
                                    ? true
                                    : "no_repeat",
                        })}
                        value={watch("repeat_password")}
                        onChange={(event) =>
                            setValue("repeat_password", event.target.value)
                        }
                        error={
                            errors?.repeat_password &&
                            errors?.repeat_password?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.repeat_password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                </section>
                <Button
                    type="submit"
                    typeButton="fill-primary"
                    className="w-100"
                    label="Изменить"
                    loading={loading}
                />
            </form>
        </div>
    )
}
