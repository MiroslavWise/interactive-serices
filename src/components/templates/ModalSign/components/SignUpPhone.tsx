import Link from "next/link"
import { useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import type { IValuesRegistrationForm } from "../types/types"

import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const SignUpPhone = memo(function SignUpPhone({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false)
    const phone = useModalAuth(({ phone }) => phone)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setFocus,
        setValue,
        setError,
    } = useForm<IValuesRegistrationForm>({
        defaultValues: {
            phone: phone,
            checkbox: false,
        },
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            setLoading(true)
            const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

            if (phoneReplace?.length <= 12) {
                setError("phone", { message: "Требуется номер телефона, состоящий из 11 цифр" })
                setLoading(false)
            }

            serviceAuth
                .phone({
                    phone: phoneReplace,
                })
                .then((response) => {
                    console.log("response: ", response)
                    if (response.ok) {
                        dispatchStartTimer()
                        dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id! })
                    } else {
                        setError("phone", { message: response?.error?.message! })
                    }
                    setLoading(false)
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onRegister)}>
            <section className={styles.section}>
                <div data-label-input>
                    <label htmlFor="phone">Телефон</label>
                    <div
                        data-phone-div
                        data-error={!!errors?.country || !!errors?.code || !!errors?.phone}
                        onClick={(event) => {
                            event.stopPropagation()
                            setFocus("phone")
                        }}
                    >
                        {!!watch("phone") && `${watch("phone")}`[0] !== "8" ? <span>+</span> : null}
                        <input
                            data-input-phone
                            placeholder="+7 999 000-00-00"
                            type="tel"
                            inputMode="numeric"
                            {...register("phone", { required: true })}
                            maxLength={16}
                            onChange={(event) => {
                                setValue("phone", event.target.value?.slice(0, 20))
                            }}
                        />
                    </div>
                    {!!errors.phone ? (
                        <i>
                            {errors.phone && errors?.phone?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors.phone?.message}
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
                        <Link
                            href={{ pathname: "/terms-consent-to-receive-mailings" }}
                            target="_blank"
                            rel="license"
                            referrerPolicy="no-referrer"
                        >
                            Согласие на получение рассылки
                        </Link>
                    </p>
                </div>
            </div>
            <Button
                type="submit"
                typeButton="fill-primary"
                label="Зарегистрироваться"
                loading={loading}
                disabled={!watch("checkbox") || !watch("phone")}
            />
            {children}
        </form>
    )
})
