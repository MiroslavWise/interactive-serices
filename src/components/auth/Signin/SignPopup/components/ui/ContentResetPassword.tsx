"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"

import type { TContentResetPassword } from "./types/types"

import {
    OnErrorToastify,
    OnSuccessToastify,
} from "@/components/common/Toastify"
import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"

import {
    checkPasswordStrength,
    usePush,
    useForgotPasswordHelper,
} from "@/helpers"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "../styles/style.module.scss"

interface IValues {
    password: string
    repeat_password: string
}

export const ContentResetPassword: TContentResetPassword = ({}) => {
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const {
        register,
        watch,
        handleSubmit,
        setError,
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
                    OnErrorToastify("Время восстановления пароля истекло")
                    handleReplace("/")
                    return
                }
                if (response.code === 500) {
                    OnErrorToastify(
                        "Извините, у нас какиe-то ошибки. Мы работаем над этим :(",
                    )
                }
                if (response.ok && !!response?.res) {
                    OnSuccessToastify(
                        "Пароль успешно изменён. Вы можете войти на аккаунт!",
                    )
                    handleReplace("/")
                    setVisibleAndType({ type: "SignIn" })
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
                    <LabelInputGroup
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        type="password"
                        propsInput={register("password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                checkPasswordStrength(value)
                                    ? true
                                    : "validate_register",
                        })}
                        errorMessage={
                            errors.password?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                    <LabelInputGroup
                        label="Подтвердите пароль"
                        rules
                        placeholder="Введите пароль еще раз"
                        type="password"
                        propsInput={register("repeat_password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                value === watch("password")
                                    ? true
                                    : "no_repeat",
                        })}
                        errorMessage={
                            errors?.repeat_password &&
                            errors?.repeat_password?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.repeat_password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                </section>
                <ButtonFill
                    disabled={loading}
                    label="Изменить"
                    classNames="w-100"
                    type="primary"
                    submit="submit"
                />
            </form>
        </div>
    )
}
