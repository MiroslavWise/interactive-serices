"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"

import type { TContentForgotPassword } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"

import { cx } from "@/lib/cx"
import { regExEmail } from "@/helpers"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { OnSuccessToastify } from "@/components/common/Toastify"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"

import styles from "../styles/style.module.scss"

interface IValues {
    email: string
}

export const ContentForgotPassword: TContentForgotPassword = ({
    setValueEmail,
}) => {
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const {
        register,
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
                    setVisibleAndType({ visible: false })
                    OnSuccessToastify(
                        "Войдите на свою почту. Мы выслали ват ссылку для восстановления пароля!",
                    )
                }
                if (response?.error?.code === 401) {
                    setError("email", { message: "user is not verified" })
                }
                if (response?.error?.code === 404) {
                    setError("email", { message: "user not found" })
                }
                if (
                    response?.code &&
                    response?.code >= 500 &&
                    response?.code <= 599
                ) {
                    setError("email", { message: "something went wrong" })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                <section className={styles.section}>
                    <LabelInputGroup
                        label="Email"
                        rules
                        placeholder="Введите свой email"
                        type="text"
                        propsInput={register("email", {
                            required: true,
                            validate: (value) => regExEmail.test(value),
                        })}
                        errorMessage={
                            errors.email &&
                            errors?.email?.message === "user is not verified"
                                ? "Пользователь не верифицирован"
                                : errors.email &&
                                  errors?.email?.message === "user not found"
                                ? "Пользователя не существует"
                                : errors.email &&
                                  errors?.email?.message ===
                                      "something went wrong"
                                ? "У нас проблемы с сервером, извините :("
                                : errors.email
                                ? "Требуется email"
                                : ""
                        }
                    />
                </section>
                <ButtonFill
                    disabled={loading}
                    label="Сброс пароля"
                    classNames="w-100"
                    type="primary"
                    submit="submit"
                />
            </form>
            <section
                className={cx(styles.Register, "cursor-pointer")}
                onClick={() => setVisibleAndType({ type: "SignIn" })}
            >
                <Image
                    src="/svg/arrow-left.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                />
                <p>Назад к странице входа</p>
            </section>
        </div>
    )
}
