import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentSignIn, IValuesSignForm } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Segments } from "@/components/common"

import { useTokenHelper } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"
import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { useAuth, dispatchAuthModal, useWelcomeModal, dispatchIModalAuthEmailOrPhone, useModalAuthEmailOrPhone } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const { on } = useToast()
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const setToken = useAuth(({ setToken }) => setToken)
    const changeAuth = useAuth(({ changeAuth }) => changeAuth)
    const setVisible = useWelcomeModal(({ setVisible }) => setVisible)
    const refTelInput = useRef<HTMLInputElement>(null)

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IValuesSignForm>()

    const onEnter = async (values: IValuesSignForm) => {
        if (!loading) {
            setLoading(true)
            if (typeEmailOrPhone === "email") {
                useTokenHelper
                    .login({
                        email: values.email,
                        password: values.password,
                    })
                    .then((response) => {
                        if (response?.error?.code === 401 && response?.error?.message === "Unauthorized") {
                            setError("password", {
                                message: "invalid password",
                            })
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
                            setError("email", { message: "user not found" })
                            return
                        }
                        if (response?.res?.secret && response?.res?.otpAuthUrl) {
                            setValueSecret({
                                secret: response?.res?.secret!,
                                url: response?.res?.otpAuthUrl!,
                            })
                            return dispatchAuthModal({ type: "FirstLoginQR" })
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
                                        email: values?.email!,
                                    })
                                    if (!responseUser?.res?.profile) {
                                        dispatchAuthModal({ visible: false })
                                        return setVisible(true)
                                    }
                                    if (!!responseUser?.res?.profile) {
                                        return changeAuth()
                                    }
                                })
                                return dispatchAuthModal({ visible: false })
                            }
                            return dispatchAuthModal({ type: "OtpCode" })
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else if (typeEmailOrPhone === "phone") {
                serviceAuth
                    .phone({
                        code: "1",
                        country: "1",
                        phone: values?.phone,
                    })
                    .then((response) => {
                        console.log(" serviceAuth phone: ", response)
                        setLoading(false)
                    })
            }
        }
    }

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
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                {typeEmailOrPhone === "email" ? (
                    <section className={styles.section}>
                        <Controller
                            key="email-key"
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <div data-label-input>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Введите свой email"
                                        {...field}
                                        inputMode="email"
                                        data-error={!!fieldState.error}
                                    />
                                    {fieldState.error ? (
                                        <i>
                                            {fieldState.error && fieldState.error?.message === "user not found"
                                                ? "Такого пользователя не существует"
                                                : fieldState.error?.message === "email not valid"
                                                ? "Требуется email"
                                                : fieldState.error
                                                ? "Какая-то ошибка с Email"
                                                : ""}
                                        </i>
                                    ) : null}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <div data-label-input data-password>
                                    <label htmlFor="password">Пароль</label>
                                    <div>
                                        <input
                                            {...field}
                                            placeholder="Введите свой пароль"
                                            type={isPass ? "text" : "password"}
                                            data-error={!!fieldState.error}
                                        />
                                        <img
                                            onClick={() => setIsPass((_) => !_)}
                                            src={`/svg/${isPass ? "eye" : "eye-off"}.svg`}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                    {fieldState.error ? (
                                        <i>
                                            {fieldState.error && fieldState?.error?.message === "invalid password"
                                                ? "Не верный пароль"
                                                : fieldState.error
                                                ? "Пароль должен содержать минимум 8 символов и из которых латинская буква, цифра"
                                                : ""}
                                        </i>
                                    ) : null}
                                </div>
                            )}
                        />
                    </section>
                ) : typeEmailOrPhone === "phone" ? (
                    <section className={styles.section}>
                        <Controller
                            key="phone-key"
                            name="phone"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <div data-label-input>
                                    <label htmlFor={field.name}>Телефон</label>
                                    <input
                                        type="tel"
                                        placeholder="Введите свой номер"
                                        {...field}
                                        ref={refTelInput}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        data-error={!!fieldState.error}
                                    />
                                    {fieldState.error ? (
                                        <i>
                                            {fieldState.error && fieldState.error?.message === "user not found"
                                                ? "Такого пользователя не существует"
                                                : fieldState.error?.message === "email not valid"
                                                ? "Требуется номер"
                                                : fieldState.error
                                                ? "Номер телефона состоит из 11 цифр"
                                                : ""}
                                        </i>
                                    ) : null}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <div data-label-input data-password>
                                    <label htmlFor="password">Пароль</label>
                                    <div>
                                        <input
                                            {...field}
                                            placeholder="Введите свой пароль"
                                            type={isPass ? "text" : "password"}
                                            data-error={!!fieldState?.error}
                                        />
                                        <img
                                            onClick={() => setIsPass((_) => !_)}
                                            src={`/svg/${isPass ? "eye" : "eye-off"}.svg`}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                    {fieldState?.error ? (
                                        <i>
                                            {fieldState?.error && fieldState?.error?.message === "invalid password"
                                                ? "Не верный пароль"
                                                : fieldState?.error
                                                ? "Пароль должен содержать минимум 8 символов и из которых латинская буква, цифра"
                                                : ""}
                                        </i>
                                    ) : null}
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
