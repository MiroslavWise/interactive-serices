import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { type ReactNode, memo, useState, useRef } from "react"

import type { IValuesRegistrationForm } from "../types/types"

import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { serviceUserValid } from "@/services/users"
import { dispatchAuthModalCodeVerification, dispatchAuthModalCurrentUser, dispatchStartTimer, useModalAuth } from "@/store/hooks"

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
    } = useForm<IValuesRegistrationForm>({
        defaultValues: {
            phone: phone || "",
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

            // serviceUserValid.getPhoneUser(phoneParse).then((response) => {
            //     console.log("response getPhoneUser: ", response)
            // if (response.ok) {
            //     if (response.res) {
            //         dispatchAuthModalCurrentUser({ user: response?.res })
            //         setLoading(false)
            //     }
            // } else {
            // if (response?.error?.message === "user not found") {
            serviceAuth
                .phone({
                    phone: number,
                })
                .then((response) => {
                    console.log("response: ", response)
                    if (response.ok) {
                        dispatchStartTimer()
                        dispatchAuthModalCodeVerification({ phone: number })
                    }
                    setLoading(false)
                })
            // }
            // }
            // })
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
                            // if (!watch("country")?.length) {
                            //     console.log("onClick country", watch("country")?.length)
                            //     setFocus("country")
                            //     return
                            // } else if (!watch("code")?.length) {
                            //     console.log("onClick code", watch("code")?.length)
                            //     setFocus("code")
                            //     return
                            // } else {
                            //     setFocus("phone")
                            //     return
                            // }
                        }}
                    >
                        <span>+</span>
                        <input
                            placeholder="7"
                            type="tel"
                            inputMode="numeric"
                            maxLength={3}
                            {...register("country", { required: true })}
                            onChange={(event) => {
                                setValue("country", event.target.value)
                                event.target.style.flex = `0 ${
                                    event.target.value?.length * 0.4375 + (event.target.value?.length - 1) * 0.0625
                                }rem`
                                if (event.target.value?.length >= 3) {
                                    setFocus("code")
                                }
                            }}
                        />
                        <span>(</span>
                        <input
                            placeholder="000"
                            type="tel"
                            inputMode="numeric"
                            maxLength={4}
                            {...register("code", { required: true })}
                            style={{ flexBasis: "1.475rem" }}
                            onChange={(event) => {
                                setValue("code", event.target.value)
                                event.target.style.flex = `0 ${
                                    event.target.value?.length * 0.4375 + (event.target.value?.length - 1) * 0.0625
                                }rem`
                                if (event.target.value?.length >= 4) {
                                    setFocus("phone")
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
                            placeholder="000-00-00"
                            type="tel"
                            inputMode="numeric"
                            {...register("phone", { required: true })}
                            style={{ flexBasis: "5.625rem" }}
                            maxLength={14}
                            onChange={(event) => {
                                console.log("event press: ", event)
                                setValue("phone", event.target.value)
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
                                : errors?.phone || errors?.code || errors?.country
                                ? "Требуется номер телефона, состоящий из 11 символов"
                                : ""}
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
