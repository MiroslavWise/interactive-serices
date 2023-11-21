import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { TContentSignIn, IValuesSignForm } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Input, InputPassword } from "@/components/common"

import { useAuth, useModalAuth, useWelcomeModal } from "@/store/hooks"
import {
    checkPasswordStrength,
    matchesUserName,
    useTokenHelper,
} from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "../styles/form.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const { setToken, changeAuth } = useAuth()
    const { dispatchAuthModal: setVisibleAndType } = useModalAuth()
    const { setVisible } = useWelcomeModal()
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<IValuesSignForm>({
        mode: "onSubmit",
        reValidateMode: "onChange",
    })

    const onEnter = async (values: IValuesSignForm) => {
        if (!loading) {
            if (!matchesUserName(values.email)) {
                return setError("email", { message: "email not valid" })
            }
            if (!checkPasswordStrength(values?.password)) {
                setError("password", { message: "invalid password" })
                return
            }
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
                        on(
                            {
                                message:
                                    "Вы не потвердили профиль через уведомление, которое вам пришло на почту!",
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
                        return setVisibleAndType({ type: "FirstLoginQR" })
                    }
                    if (response?.error) {
                        console.log(
                            "ERROR ---У нас возникла ошибка, мы сейчас её решаем!---",
                            response?.error,
                        )
                        on(
                            {
                                message:
                                    "У нас возникла ошибка, мы сейчас её решаем!",
                            },
                            "warning",
                        )
                        return
                    }
                    if (response.ok) {
                        if (
                            response.res?.accessToken &&
                            response?.res?.refreshToken &&
                            response?.res?.tokenType
                        ) {
                            serviceUsers
                                .getId(response?.res?.id)
                                .then((responseUser) => {
                                    setToken({
                                        ok: true,
                                        token: response?.res?.accessToken!,
                                        refreshToken:
                                            response?.res?.refreshToken!,
                                        expires: response?.res?.expires!,
                                        userId: response?.res?.id!,
                                        email: values?.email!,
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
    }

    return (
        <div className={styles.content} data-mobile={isMobile}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onEnter)}
                noValidate
            >
                <section className={styles.section}>
                    <Input
                        label="Email"
                        rules
                        {...register("email", { required: true })}
                        value={watch("email")}
                        placeholder="Введите свой email"
                        type="email"
                        onChange={(event) =>
                            setValue("email", event.target.value)
                        }
                        error={
                            errors.email &&
                            errors.email?.message === "user not found"
                                ? "Такого пользователя не существует"
                                : errors.email?.message === "email not valid"
                                ? "Требуется email"
                                : errors.email
                                ? "Какая-то ошибка с Email"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        {...register("password", { required: true })}
                        value={watch("password")}
                        onChange={(event) =>
                            setValue("password", event.target.value)
                        }
                        error={
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
                        onClick={() => {
                            console.log("ForgotPassword")
                            setVisibleAndType({ type: "ForgotPassword" })
                        }}
                    >
                        Забыли пароль?
                    </a>
                </div>
                <Button
                    type="submit"
                    typeButton="fill-primary"
                    label="Войти"
                    className="w-100"
                    loading={loading}
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
