import { useRef, useState } from "react"
// import { useForm, Controller } from "react-hook-form"
import { type FormApi, useForm } from "@tanstack/react-form"

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

    const form = useForm<IValuesSignForm>({ onSubmit: onEnter, defaultValues: { phone: "", email: "", password: "" } })
    const { Field } = form

    function onEnter({ value, formApi }: { value: IValuesSignForm; formApi: FormApi<IValuesSignForm> }) {
        const { setFieldMeta } = formApi

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
                            setFieldMeta("password", (state) => {
                                state.errors = ["Не верный пароль"]
                                return state
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
                            console.log("response.error?.code: ", response.error)
                            setFieldMeta("email", (state) => {
                                state.errors = ["Данного пользователя не существует"]
                                return state
                            })
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
                                        return setVisible(true)
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
                const code = value.phone?.slice(0, 3)
                const phone = value.phone?.slice(3)?.slice(0, 7)

                serviceAuth.phone({ country: "7", code, phone }).then((response) => {
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
            <form.Provider>
                <form
                    className={styles.form}
                    onSubmit={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        void form.handleSubmit()
                    }}
                >
                    {typeEmailOrPhone === "email" ? (
                        <section className={styles.section}>
                            <Field name="email">
                                {(field) => (
                                    <div data-label-input>
                                        <label htmlFor={field.name}>Email</label>
                                        <input
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(event) => field.handleChange(event.target.value)}
                                            type="email"
                                            placeholder="Введите свой email"
                                            inputMode="email"
                                            data-error={!!field.state.meta?.errors?.length}
                                        />
                                        {field.state.meta.errors.length ? <i>{field.state.meta.errors.join(", ")}</i> : null}
                                    </div>
                                )}
                            </Field>
                            <Field
                                name="password"
                                validators={{
                                    onChangeAsync: async (value) =>
                                        value.value.length < 6 ? "Пароль должен быть не менее 6 символов" : undefined,
                                }}
                            >
                                {(field) => (
                                    <div data-label-input data-password>
                                        <label htmlFor={field.name}>Пароль</label>
                                        <div>
                                            <input
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(event) => field.handleChange(event.target.value?.trim())}
                                                placeholder="Введите свой пароль"
                                                type={isPass ? "text" : "password"}
                                                data-error={!!field.state.meta?.errors?.length}
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
                                        {field.state.meta.errors.length ? <i>{field.state.meta.errors.join(", ")}</i> : null}
                                    </div>
                                )}
                            </Field>
                        </section>
                    ) : typeEmailOrPhone === "phone" ? (
                        <section className={styles.section}>
                            <Field
                                name="phone"
                                validators={{
                                    onBlur: ({ value }) => (value?.length < 11 ? "Номер телефона состоит из 11 цифр" : undefined),
                                }}
                            >
                                {(field) => {
                                    const value = field.state.value || ""
                                    return (
                                        <div data-label-input>
                                            <label htmlFor={field.name}>Телефон</label>
                                            <div data-phone-mask>
                                                <input
                                                    data-input-mask
                                                    type="text"
                                                    value={maskInputPhone(value)}
                                                    data-error={!!field.state.meta?.errors?.length}
                                                    placeholder="Введите свой номер"
                                                    readOnly
                                                />
                                                <input
                                                    data-absolute-mask
                                                    name={field.name}
                                                    value={value}
                                                    onChange={(event) => field.handleChange(event.target.value)}
                                                    type="number"
                                                    placeholder="Введите свой номер"
                                                    inputMode="numeric"
                                                    pattern="^\d{10}$"
                                                    maxLength={10}
                                                />
                                            </div>
                                            {field.state.meta.errors.length ? <i>{field.state.meta.errors.join(", ")}</i> : null}
                                        </div>
                                    )
                                }}
                            </Field>
                            <Field
                                name="password"
                                validators={{
                                    onChangeAsync: async (value) =>
                                        value.value.length < 6 ? "Пароль должен быть не менее 6 символов" : undefined,
                                }}
                            >
                                {(field) => (
                                    <div data-label-input data-password>
                                        <label htmlFor={field.name}>Пароль</label>
                                        <div>
                                            <input
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(event) => field.handleChange(event.target.value)}
                                                placeholder="Введите свой пароль"
                                                type={isPass ? "text" : "password"}
                                                data-error={!!field.state.meta?.errors?.length}
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
                                        {field.state.meta.errors.length ? <i>{field.state.meta.errors.join(", ")}</i> : null}
                                    </div>
                                )}
                            </Field>
                        </section>
                    ) : null}
                    <div className={styles.RememberChange}>
                        <a onClick={() => dispatchAuthModal({ type: "ForgotPassword" })}>Забыли пароль?</a>
                    </div>
                    <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
                    <LinksSocial />
                </form>
            </form.Provider>

            <article data-column>
                <p>
                    Нет аккаунта? <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>Зарегистрироваться</a>
                </p>
            </article>
        </div>
    )
}

function maskInputPhone(value: string) {
    const [code1, code2, code3, phone1, phone2, phone3, phone4, phone5, phone6, phone7] = value.split("")

    return `+${7}(${code1 || "_"}${code2 || "_"}${code3 || "_"})${phone1 || "_"}${phone2 || "_"}${phone3 || "_"}-${phone4 || "_"}${
        phone5 || "_"
    }-${phone6 || "_"}${phone7 || "_"}`
}
