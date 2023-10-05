"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

import type { TContentSignIn, IValuesSignForm } from "./types/types"

import { LinksSocial } from "./components/LinksSocial"
import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"

import {
    useAuth,
    useVisibleAndTypeAuthModal,
    useWelcomeModal,
} from "@/store/hooks"
import { usersService } from "@/services/users"
import { useTokenHelper, regExEmail } from "@/helpers"

import styles from "../styles/style.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const [loading, setLoading] = useState(false)
    const { setToken, changeAuth } = useAuth()
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { setVisible } = useWelcomeModal()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IValuesSignForm>()

    const onError = (value: string) =>
        toast(value, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

    const onEnter = async (values: IValuesSignForm) => {
        setLoading(true)
        useTokenHelper
            .login({
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                if (
                    response?.error?.code === 401 &&
                    response?.error?.message === "Unauthorized"
                ) {
                    setError("password", { message: "invalid password" })
                    return
                }
                if (
                    response.error?.code === 401 &&
                    response?.error?.message === "user is not verified"
                ) {
                    onError(
                        "Вы не потвердили профиль через уведомление, которое вам пришло на почту или номер телефона!",
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
                    return setVisibleAndType({ type: "FirstLoginQR" })
                }
                if (response?.error) {
                    console.log(
                        "ERROR ---У нас возникла ошибка, мы сейчас её решаем!---",
                        response?.error,
                    )
                    onError("У нас возникла ошибка, мы сейчас её решаем!")
                    return
                }
                if (response.ok) {
                    if (
                        response.res?.accessToken &&
                        response?.res?.refreshToken &&
                        response?.res?.tokenType
                    ) {
                        usersService
                            .getId(response?.res?.id)
                            .then((responseUser) => {
                                setToken({
                                    ok: true,
                                    token: response?.res?.accessToken!,
                                    refreshToken: response?.res?.refreshToken!,
                                    expires: response?.res?.expires!,
                                    userId: response?.res?.id!,
                                })
                                if (!responseUser?.res?.profile) {
                                    setVisibleAndType({ visible: false })
                                    return setVisible(true)
                                }
                                if (!!responseUser?.res?.profile) {
                                    return changeAuth()
                                }
                            })
                        return setVisibleAndType({ visible: false })
                    }
                    return setVisibleAndType({ type: "OtpCode" })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                <section className={styles.section}>
                    <LabelInputGroup
                        label="Email"
                        rules
                        placeholder="Введите свой email"
                        type="text"
                        propsInput={register("email", {
                            required: true,
                            validate: (value) => regExEmail.test(value),
                        })}
                        errorMessage={
                            errors.email &&
                            errors.email?.message === "user not found"
                                ? "Такого пользователя не существует"
                                : errors.email
                                ? "Требуется email"
                                : ""
                        }
                    />
                    <LabelInputGroup
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        type="password"
                        propsInput={register("password", { required: true })}
                        errorMessage={
                            errors.password &&
                            errors.password.message === "invalid password"
                                ? "Не верный пароль"
                                : errors.password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                </section>
                <div className={styles.RememberChange}>
                    <div className={styles.checkRemember}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                {...register("checkbox")}
                                className=""
                            />
                            <span className={styles.checkmark}>
                                <Image
                                    src="/svg/check.svg"
                                    alt="check"
                                    width={16}
                                    height={16}
                                />
                            </span>
                        </label>
                        <p>Запомнить на 30 дней</p>
                    </div>
                    <a
                        onClick={() =>
                            setVisibleAndType({ type: "ForgotPassword" })
                        }
                    >
                        Забыли пароль?
                    </a>
                </div>
                <ButtonFill
                    label="Войти"
                    classNames="w-100"
                    type="primary"
                    submit="submit"
                    disabled={loading}
                />
                <LinksSocial />
            </form>
            <section className={styles.Register}>
                <p>Нет аккаунта?</p>
                <a onClick={() => setVisibleAndType({ type: "SignUp" })}>
                    Зарегистрироваться
                </a>
            </section>
        </div>
    )
}
