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
        control,
        setError,
        formState: { errors },
    } = useForm<IValuesSignForm>({ defaultValues: { phone: "" } })

    function onEnter(value: IValuesSignForm) {
        if (!loading) {
            setLoading(true)
            const phone = value.phone?.replaceAll(/[^\d]/g, "")
            const phoneParse = `${phone[0]}-${phone[1]}${phone[2]}${phone[3]}-${phone?.slice(4)}`
            if (phone?.length < 11) {
                setError("phone", { message: "Номер телефона состоит из 11 цифр" })
            }

            serviceAuth.phone({ phone: phoneParse }).then((response) => {
                if (response?.ok) {
                    if (response.ok) {
                        dispatchStartTimer()
                        dispatchAuthModalCodeVerification({ phone: phoneParse })
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
                <Controller
                    name="phone"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <div data-label-input>
                            <label htmlFor={field.name}>Телефон</label>
                            <input
                                autoComplete="off"
                                data-error={!!errors.phone}
                                type="tel"
                                placeholder="+7 (000) 000-00-00"
                                inputMode="numeric"
                                {...field}
                            />
                            {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                        </div>
                    )}
                />
            </section>
            {itemForgot}
            <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
            {children}
        </form>
    )
})
