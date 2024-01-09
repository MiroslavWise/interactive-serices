import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentSignIn, IValuesSignForm } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Segments } from "@/components/common"

import { useTokenHelper } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"
import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { useAuth, dispatchAuthModal, dispatchIModalAuthEmailOrPhone, useModalAuthEmailOrPhone } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const { on } = useToast()
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const setToken = useAuth(({ setToken }) => setToken)
    const changeAuth = useAuth(({ changeAuth }) => changeAuth)

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<IValuesSignForm>({ defaultValues: { phone: "", email: "", password: "" } })

    function onEnter(value: IValuesSignForm) {
        if (!loading) {
            setLoading(true)
            if (typeEmailOrPhone === "email") {
                useTokenHelper
                    .login({
                        email: value.email,
                        password: value.password,
                    })
                    .then((response) => {
                        if (response?.error?.code === 401 && response?.error?.message === "Unauthorized") {
                            setError("password", { message: "Не верный пароль" })
                            return
                        }
                        if (response.error?.code === 401 && response?.error?.message === "user is not verified") {
                            on(
                                {
                                    message: "Вы не потвердили профиль через уведомление, которое вам пришло на почту!",
                                },
                                "warning",
                            )
                            return
                        }
                        if (response.error?.code === 404) {
                            setError("email", { message: "Данного пользователя не существует" })
                            return
                        }
                        if (response?.res?.secret && response?.res?.otpAuthUrl) {
                            setValueSecret({
                                secret: response?.res?.secret!,
                                url: response?.res?.otpAuthUrl!,
                            })
                            dispatchAuthModal({ type: "FirstLoginQR" })
                            return
                        }
                        if (response?.error) {
                            console.log("ERROR ---У нас возникла ошибка, мы сейчас её решаем!---", response?.error)
                            on(
                                {
                                    message: "У нас возникла ошибка, мы сейчас её решаем!",
                                },
                                "warning",
                            )
                            return
                        }
                        if (response.ok) {
                            if (response.res?.accessToken && response?.res?.refreshToken && response?.res?.tokenType) {
                                serviceUsers.getId(response?.res?.id).then((responseUser) => {
                                    setToken({
                                        ok: true,
                                        token: response?.res?.accessToken!,
                                        refreshToken: response?.res?.refreshToken!,
                                        expires: response?.res?.expires!,
                                        userId: response?.res?.id!,
                                        email: value?.email!,
                                    })
                                    if (!responseUser?.res?.profile) {
                                        dispatchAuthModal({ visible: false })
                                        // setVisible(true)
                                        return
                                    }
                                    if (!!responseUser?.res?.profile) {
                                        return changeAuth()
                                    }
                                })
                                dispatchAuthModal({ visible: false })
                                return
                            }
                            dispatchAuthModal({ type: "OtpCode" })
                            return
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else if (typeEmailOrPhone === "phone") {
                const phone = value.phone?.replaceAll(/[^\d]/g, "")
                if (phone?.length < 11) {
                    setError("phone", { message: "Номер телефона состоит из 11 цифр" })
                }

                serviceAuth
                    .phone({ phone: `${phone[0]}-${phone[1]}${phone[2]}${phone[3]}-${phone.slice(4)}`, password: value?.password })
                    .then((response) => {
                        if (response?.ok) {
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
    }

    const submit = handleSubmit(onEnter)

    return (
        <div className={styles.content}>
            <Segments
                type="primary"
                VALUES={VALUES_EMAIL_PHONE}
                active={VALUES_EMAIL_PHONE.find((item) => item.value === typeEmailOrPhone)!}
                setActive={(event) => {
                    dispatchIModalAuthEmailOrPhone(event.value)
                }}
                isBorder
            />
            <form className={styles.form} onSubmit={submit}>
                {typeEmailOrPhone === "email" ? (
                    <section className={styles.section}>
                        <Controller
                            name="email"
                            rules={{ required: true }}
                            control={control}
                            render={({ field }) => (
                                <div data-label-input>
                                    <label htmlFor={field.name}>Email</label>
                                    <input
                                        autoComplete="off"
                                        type="email"
                                        placeholder="Введите свой email"
                                        inputMode="email"
                                        {...field}
                                        data-error={!!errors.email}
                                    />
                                    {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, minLength: 5 }}
                            render={({ field }) => (
                                <div data-label-input data-password>
                                    <label htmlFor={field.name}>Пароль</label>
                                    <div>
                                        <input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Введите свой пароль"
                                            type={isPass ? "text" : "password"}
                                        />
                                        <img
                                            onClick={() => setIsPass((prev) => !prev)}
                                            src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                    {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                                </div>
                            )}
                        />
                    </section>
                ) : typeEmailOrPhone === "phone" ? (
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
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, minLength: 5 }}
                            render={({ field }) => (
                                <div data-label-input data-password>
                                    <label htmlFor={field.name}>Пароль</label>
                                    <div>
                                        <input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Введите свой пароль"
                                            type={isPass ? "text" : "password"}
                                        />
                                        <img
                                            onClick={() => setIsPass((prev) => !prev)}
                                            src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                    {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                                </div>
                            )}
                        />
                    </section>
                ) : null}
                <div className={styles.RememberChange}>
                    <a onClick={() => dispatchAuthModal({ type: "ForgotPassword" })}>Забыли пароль?</a>
                </div>
                <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
                <LinksSocial />
            </form>
            <article data-column>
                <p>
                    Нет аккаунта? <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>Зарегистрироваться</a>
                </p>
            </article>
        </div>
    )
}
