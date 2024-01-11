import { useForm, Controller } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { IValuesSignForm } from "../types/types"

import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const SignInPhone = memo(function SignInPhone({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) {
    const [loading, setLoading] = useState(false)

    const {
        handleSubmit,
        setError,
        watch,
        register,
        setFocus,
        setValue,
        formState: { errors },
    } = useForm<IValuesSignForm>({ defaultValues: { phone: "" } })

    function onEnter(values: IValuesSignForm) {
        if (!loading) {
            setLoading(true)
            const country = values.country?.replaceAll(/[^\d]/g, "")
            const code = values.code?.replaceAll(/[^\d]/g, "")
            const phone = values.phone?.replaceAll(/[^\d]/g, "")
            const number = `${country}-${code}-${phone}`

            if (number?.replaceAll("-", "")?.length < 11) {
                setError("phone", { message: "Номер телефона состоит из 11 цифр" })
            }

            serviceAuth.phone({ phone: number }).then((response) => {
                if (response?.ok) {
                    if (response.ok) {
                        dispatchStartTimer()
                        dispatchAuthModalCodeVerification({ phone: number })
                    }
                    setLoading(false)
                } else {
                    if (response?.error?.message === "user not found") {
                        setError("phone", { message: "Данного пользователя не существует" })
                    }
                    if (response?.error?.message === "Unauthorized") {
                        setError("password", { message: "Не верный пароль" })
                    }
                }
                console.log(" serviceAuth phone: ", response)
                setLoading(false)
            })
        }
    }

    const submit = handleSubmit(onEnter)

    return (
        <form onSubmit={submit}>
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
                    {!!errors?.phone ? <i>{errors?.phone?.message}</i> : null}
                </div>
            </section>
            {itemForgot}
            <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
            {children}
        </form>
    )
})
