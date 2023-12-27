import { useEffect, useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentSignIn, IValuesSignForm } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button } from "@/components/common"

import { useTokenHelper } from "@/helpers"
import { serviceAuth } from "@/services/auth"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"
import { useAuth, dispatchAuthModal, useWelcomeModal } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const setToken = useAuth(({ setToken }) => setToken)
    const changeAuth = useAuth(({ changeAuth }) => changeAuth)
    const setVisible = useWelcomeModal(({ setVisible }) => setVisible)
    const [isEmail, setIsEmail] = useState(true)
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
            if (isEmail) {
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
            } else {
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

    useEffect(() => {}, [refTelInput])

    return (
        <div className={styles.content}>
            <div data-selection>
                <div
                    data-active={isEmail}
                    onClick={() => {
                        if (!loading) {
                            setIsEmail(true)
                        }
                    }}
                >
                    <span>Email</span>
                </div>
                <div
                    data-active={!isEmail}
                    onClick={() => {
                        if (!loading) {
                            setIsEmail(false)
                        }
                    }}
                >
                    <span>Телефон</span>
                </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                {isEmail ? (
                    <section className={styles.section}>
                        <div data-label-input>
                            <label htmlFor="email">
                                Email <sup>*</sup>
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <input type="email" placeholder="Введите свой email" {...field} />}
                            />
                            {errors.email ? (
                                <i>
                                    {errors.email && errors.email?.message === "user not found"
                                        ? "Такого пользователя не существует"
                                        : errors.email?.message === "email not valid"
                                        ? "Требуется email"
                                        : errors.email
                                        ? "Какая-то ошибка с Email"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                        <div data-label-input data-password>
                            <label htmlFor="password">
                                Пароль <sup>*</sup>
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <div>
                                        <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                        <img
                                            onClick={() => setIsPass((_) => !_)}
                                            src={`/svg/${isPass ? "eye" : "eye-off"}.svg`}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                )}
                            />
                            {errors.password ? (
                                <i>
                                    {errors.password && errors.password.message === "invalid password"
                                        ? "Не верный пароль"
                                        : errors.password
                                        ? "Требуется пароль"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                    </section>
                ) : (
                    <section className={styles.section}>
                        <div data-label-input>
                            <label htmlFor="phone">
                                Телефон <sup>*</sup>
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <input type="tel" placeholder="Введите свой номер" {...field} ref={refTelInput} />}
                            />
                            {errors.phone ? (
                                <i>
                                    {errors.phone && errors.phone?.message === "user not found"
                                        ? "Такого пользователя не существует"
                                        : errors.phone?.message === "email not valid"
                                        ? "Требуется номер"
                                        : errors.phone
                                        ? "Какая-то ошибка с номером"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                        <div data-label-input data-password>
                            <label htmlFor="password">
                                Пароль <sup>*</sup>
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <div>
                                        <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                        <img
                                            onClick={() => setIsPass((_) => !_)}
                                            src={`/svg/${isPass ? "eye" : "eye-off"}.svg`}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            data-eye
                                        />
                                    </div>
                                )}
                            />
                            {errors.password ? (
                                <i>
                                    {errors.password && errors.password.message === "invalid password"
                                        ? "Не верный пароль"
                                        : errors.password
                                        ? "Требуется пароль"
                                        : ""}
                                </i>
                            ) : null}
                        </div>
                    </section>
                )}
                <div className={styles.RememberChange}>
                    <a onClick={() => dispatchAuthModal({ type: "ForgotPassword" })}>Забыли пароль?</a>
                </div>
                <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
                <LinksSocial />
            </form>
            <section className={styles.Register}>
                <p>Нет аккаунта?</p>
                <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>Зарегистрироваться</a>
            </section>
        </div>
    )
}
