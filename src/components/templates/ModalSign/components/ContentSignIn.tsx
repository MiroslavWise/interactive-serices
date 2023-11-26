import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { TContentSignIn, IValuesSignForm } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button } from "@/components/common"

import { useAuth, useModalAuth, useWelcomeModal } from "@/store/hooks"
import {
    checkPasswordStrength,
    matchesUserName,
    useTokenHelper,
} from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "../styles/form.module.scss"
import Image from "next/image"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const setToken = useAuth(({ setToken }) => setToken)
    const changeAuth = useAuth(({ changeAuth }) => changeAuth)
    const dispatchAuthModal = useModalAuth(
        ({ dispatchAuthModal }) => dispatchAuthModal,
    )
    const setVisible = useWelcomeModal(({ setVisible }) => setVisible)

    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<IValuesSignForm>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })

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
                    <div data-label-input>
                        <label>
                            Email <sup>*</sup>
                        </label>
                        <Controller
                            name="finaly_qwer"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    type="email"
                                    placeholder="Введите свой email"
                                    {...field}
                                />
                            )}
                        />
                        {errors.finaly_qwer ? (
                            <i>
                                {errors.finaly_qwer &&
                                errors.finaly_qwer?.message === "user not found"
                                    ? "Такого пользователя не существует"
                                    : errors.finaly_qwer?.message ===
                                      "email not valid"
                                    ? "Требуется email"
                                    : errors.finaly_qwer
                                    ? "Какая-то ошибка с Email"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
                    <div data-label-input data-password>
                        <label>
                            Пароль <sup>*</sup>
                        </label>
                        <Controller
                            name="_qwer_rrewwrerq"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div>
                                    <input
                                        {...field}
                                        placeholder="Введите свой пароль"
                                        type={isPass ? "text" : "password"}
                                    />
                                    <Image
                                        onClick={() =>
                                            setIsPass((prev) => !prev)
                                        }
                                        src={
                                            isPass
                                                ? "/svg/eye.svg"
                                                : "/svg/eye-off.svg"
                                        }
                                        alt="eye"
                                        width={20}
                                        height={20}
                                        data-eye
                                        unoptimized
                                    />
                                </div>
                            )}
                        />
                        {errors._qwer_rrewwrerq ? (
                            <i>
                                {errors._qwer_rrewwrerq &&
                                errors._qwer_rrewwrerq.message ===
                                    "invalid password"
                                    ? "Не верный пароль"
                                    : errors._qwer_rrewwrerq
                                    ? "Требуется пароль"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
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
                        onClick={() =>
                            dispatchAuthModal({ type: "ForgotPassword" })
                        }
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
