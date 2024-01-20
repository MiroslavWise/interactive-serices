import Link from "next/link"
import { useForm } from "react-hook-form"
import { ReactNode, memo, useState } from "react"

import { IValuesRegistrationForm } from "../types/types"

import { Button } from "@/components/common"

import { serviceUser } from "@/services"
import { dispatchAuthModalCreatePassword, dispatchAuthModalCurrentUser, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const SignUpEmail = memo(function SignUpEmail({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false)
    const email = useModalAuth(({ email }) => email)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>({
        defaultValues: {
            email: email || "",
            checkbox: false,
        },
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            setLoading(true)
            serviceUser.getEmail(values.email!).then((response) => {
                console.log("response getEmailUser: ", response)
                if (response.ok) {
                    if (response.res) {
                        dispatchAuthModalCurrentUser({ user: response?.res })
                    }
                } else {
                    if (response?.error?.message === "user not found") {
                        dispatchAuthModalCreatePassword({
                            email: values.email,
                        })
                    }
                }
                setLoading(false)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onRegister)}>
            <section className={styles.section}>
                <div data-label-input>
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        data-error={!!errors.email}
                        type="email"
                        placeholder="email_address@mail.com"
                        inputMode="email"
                        {...register("email", { required: true })}
                    />
                    {!!errors.email ? (
                        <i>
                            {errors.email && errors?.email?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors?.email
                                ? "Поле не может оставаться незаполненным"
                                : "Какая-то ошибка с Email"}
                        </i>
                    ) : null}
                </div>
            </section>
            <div className={styles.RememberChange}>
                <div className={styles.checkRemember}>
                    <label className={styles.checkbox} data-check={watch("checkbox")}>
                        <input type="checkbox" {...register("checkbox", { required: true })} />
                        <span className={styles.checkmark}>
                            <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={watch("checkbox")} />
                        </span>
                    </label>
                    <p data-terms data-error={!!errors.checkbox}>
                        Регистрируясь, вы соглашаетесь с{" "}
                        <Link href={{ pathname: "/terms-rules" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                            Правилами пользования
                        </Link>
                        ,{" "}
                        <Link href={{ pathname: "/terms-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                            Политикой конфиденциальности
                        </Link>{" "}
                        и{" "}
                        <Link href={{ pathname: "/terms-consent-to-receive-mailings" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                            Согласие на получение рассылки
                        </Link>
                    </p>
                </div>
            </div>
            <Button type="submit" typeButton="fill-primary" label="Зарегистрироваться" loading={loading} disabled={!watch("checkbox") || !watch("email")} />
            {children}
        </form>
    )
})
