"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"

import type { TContentForgotPassword } from "../types/types"

import { Button, Input } from "@/components/common"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { useModalAuth } from "@/store/hooks"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"

import styles from "../styles/form.module.scss"

interface IValues {
    email: string
}

export const ContentForgotPassword: TContentForgotPassword = ({
    setValueEmail,
}) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useModalAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        watch,
    } = useForm<IValues>()

    const onEnter = async (values: IValues) => {
        setLoading(true)
        useForgotPasswordHelper
            .forgotPassword({ email: values.email })
            .then((response) => {
                if (response.ok && !!response?.res) {
                    setVisibleAndType({ visible: false })
                    on({
                        message:
                            "Войдите на свою почту. Мы выслали ват ссылку для восстановления пароля!",
                    })
                }
                if (response?.error?.code === 401) {
                    setError("email", { message: "user is not verified" })
                    on({ message: "Пользователь не верифицирован!" }, "error")
                    setVisibleAndType({ visible: false })
                }
                if (response?.error?.code === 404) {
                    setError("email", { message: "user not found" })
                    on({ message: "Пользователя не существует!" }, "error")
                    setVisibleAndType({ visible: false })
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
                    <Input
                        label="Email"
                        rules
                        placeholder="Введите свой email"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        value={watch("email")}
                        onChange={(event) =>
                            setValue("email", event.target.value)
                        }
                        error={
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
                <Button
                    type="submit"
                    typeButton="fill-primary"
                    label="Сброс пароля"
                    className="w-100"
                    loading={loading}
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
