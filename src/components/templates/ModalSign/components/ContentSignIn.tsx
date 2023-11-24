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
    const { setToken, changeAuth } = useAuth((_) => ({
        setToken: _.setToken,
        changeAuth: _.changeAuth,
    }))
    const { dispatchAuthModal } = useModalAuth((_) => ({
        dispatchAuthModal: _.dispatchAuthModal,
    }))
    const { setVisible } = useWelcomeModal((_) => ({
        setVisible: _.setVisible,
    }))
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<IValuesSignForm>({})

    const onEnter = async (values: IValuesSignForm) => {
        if (!loading) {
            if (!matchesUserName(values.finaly_qwer)) {
                return setError("finaly_qwer", { message: "email not valid" })
            }
            if (!checkPasswordStrength(values?._qwer_rrewwrerq)) {
                setError("_qwer_rrewwrerq", { message: "invalid password" })
                return
            }
            setLoading(true)
            useTokenHelper
                .login({
                    email: values.finaly_qwer,
                    password: values._qwer_rrewwrerq,
                })
                .then((response) => {
                    if (
                        response?.error?.code === 401 &&
                        response?.error?.message === "Unauthorized"
                    ) {
                        setError("_qwer_rrewwrerq", {
                            message: "invalid password",
                        })
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
                        setError("finaly_qwer", { message: "user not found" })
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
                                        email: values?.finaly_qwer!,
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
        }
    }

    return (
        <div className={styles.content} data-mobile={isMobile}>
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                <section className={styles.section}>
                    <Input
                        label="Email"
                        rules
                        {...register("finaly_qwer", { required: true })}
                        value={watch("finaly_qwer")}
                        placeholder="Введите свой email"
                        type="email"
                        onChange={(event) =>
                            setValue("finaly_qwer", event.target.value)
                        }
                        error={
                            errors.finaly_qwer &&
                            errors.finaly_qwer?.message === "user not found"
                                ? "Такого пользователя не существует"
                                : errors.finaly_qwer?.message ===
                                  "email not valid"
                                ? "Требуется email"
                                : errors.finaly_qwer
                                ? "Какая-то ошибка с Email"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        {...register("_qwer_rrewwrerq", { required: true })}
                        value={watch("_qwer_rrewwrerq")}
                        onChange={(event) =>
                            setValue("_qwer_rrewwrerq", event.target.value)
                        }
                        error={
                            errors._qwer_rrewwrerq &&
                            errors._qwer_rrewwrerq.message ===
                                "invalid password"
                                ? "Не верный пароль"
                                : errors._qwer_rrewwrerq
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
                                <div
                                    data-check
                                    style={{
                                        backgroundImage: `url(/svg/check.svg)`,
                                    }}
                                />
                            </span>
                        </label>
                        <p>Запомнить на 30 дней</p>
                    </div>
                    <a
                        onClick={() => {
                            console.log("ForgotPassword")
                            dispatchAuthModal({ type: "ForgotPassword" })
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
                <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>
                    Зарегистрироваться
                </a>
            </section>
        </div>
    )
}
