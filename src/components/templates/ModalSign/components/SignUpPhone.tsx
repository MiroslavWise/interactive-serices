import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

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
        control,
        watch,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>({
        defaultValues: {
            phone: phone || "",
            checkbox: false,
        },
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            setLoading(true)
            setLoading(true)
            const phoneValue = values.phone?.replaceAll(/[^\d]/g, "")
            const phoneParse = `${phoneValue[0]}-${phoneValue[1]}${phoneValue[2]}${phoneValue[3]}-${phoneValue?.slice(4)}`

            serviceUserValid.getPhoneUser(phoneParse).then((response) => {
                console.log("response getPhoneUser: ", response)
                if (response.ok) {
                    if (response.res) {
                        dispatchAuthModalCurrentUser({ user: response?.res })
                        setLoading(false)
                    }
                } else {
                    if (response?.error?.message === "user not found") {
                        serviceAuth
                            .phone({
                                phone: phoneParse,
                            })
                            .then((response) => {
                                if (response.ok) {
                                    dispatchStartTimer()
                                    dispatchAuthModalCodeVerification({ phone: phoneParse })
                                }
                                setLoading(false)
                            })
                    }
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onRegister)}>
            <section className={styles.section}>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div data-label-input>
                            <label htmlFor={field.name}>Телефон</label>
                            <input data-error={!!errors.phone} type="tel" placeholder="+7 (000) 000-00-00" inputMode="numeric" {...field} />
                            {!!errors.phone ? (
                                <i>
                                    {errors.phone && errors?.phone?.message === "user already exists"
                                        ? "Пользователь уже существует"
                                        : errors?.phone
                                        ? "Требуется номер телефона, состоящий из 11 символов"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                    )}
                />
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
