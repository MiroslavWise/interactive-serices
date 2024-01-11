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

    const splitPhone = phone?.split("-")

    const numberPhone = phone
        ? {
              country: splitPhone?.[0] || "",
              code: splitPhone?.[1] || "",
              phone: splitPhone?.[2] || "",
          }
        : {}

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
            ...numberPhone,
            checkbox: false,
        },
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            setLoading(true)
            const country = values.country?.replaceAll(/[^\d]/g, "")
            const code = values.code?.replaceAll(/[^\d]/g, "")
            const phone = values.phone?.replaceAll(/[^\d]/g, "")
            const number = `${country}-${code}-${phone}`

            serviceAuth
                .phone({
                    phone: number,
                })
                .then((response) => {
                    console.log("response: ", response)
                    if (response.ok) {
                        dispatchStartTimer()
                        dispatchAuthModalCodeVerification({ phone: number, id: response?.res?.id! })
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
                    <div data-phone-div data-error={!!errors?.country || !!errors?.code || !!errors?.phone}>
                        <span>+</span>
                        <input
                            data-input-country
                            placeholder="7"
                            type="number"
                            inputMode="numeric"
                            maxLength={3}
                            {...register("country", { required: true })}
                            onChange={(event) => {
                                setValue("country", event.target.value)
                                if (event.target.value?.length > 0) {
                                    event.target.style.flex = `0 ${
                                        event.target.value?.length * 0.4775 + (event.target.value?.length - 1) * 0.0725 + 0.125
                                    }rem`
                                    if (event.target.value?.length >= 3) {
                                        setFocus("code")
                                    }
                                }
                            }}
                        />
                        <span>(</span>
                        <input
                            data-input-code
                            placeholder="000"
                            type="number"
                            inputMode="numeric"
                            maxLength={4}
                            {...register("code", { required: true })}
                            onChange={(event) => {
                                setValue("code", event.target.value)
                                if (event.target.value?.length > 0) {
                                    event.target.style.flex = `0 ${
                                        event.target.value?.length * 0.4775 + (event.target.value?.length - 1) * 0.0725 + 0.125
                                    }rem`
                                    if (event.target.value?.length >= 4) {
                                        setFocus("phone")
                                    }
                                } else if (event.target?.value?.length === 0) {
                                    event.target.style.flex = `0 0 1.675rem`
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Backspace" && watch("code")?.length === 0) {
                                    setFocus("country")
                                }
                            }}
                            onFocus={(event) => {
                                if (watch("country")?.length === 0) {
                                    setFocus("country")
                                }
                            }}
                        />
                        <span>)</span>
                        <span> </span>
                        <input
                            data-input-phone
                            placeholder="000-00-00"
                            type="number"
                            inputMode="numeric"
                            {...register("phone", { required: true })}
                            maxLength={10}
                            onChange={(event) => {
                                setValue("phone", event.target.value?.slice(0, 10))
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Backspace" && watch("phone")?.length === 0) {
                                    setFocus("code")
                                }
                            }}
                            onFocus={(event) => {
                                if (watch("code")?.length === 0) {
                                    setFocus("code")
                                }
                            }}
                        />
                    </div>
                    {!!errors.phone ? (
                        <i>
                            {errors.phone && errors?.phone?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors.phone?.message
                                ? errors.phone?.message
                                : errors?.phone || errors?.code || errors?.country
                                ? "Требуется номер телефона, состоящий из 11 символов"
                                : null}
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
            <Button type="submit" typeButton="fill-primary" label="Зарегистрироваться" loading={loading} />
            {children}
        </form>
    )
})
