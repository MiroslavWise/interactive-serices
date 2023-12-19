"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"

import type { IValuesRegistrationForm, TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { RegistrationService } from "@/services/auth/registrationService"
import { dispatchAuthModal, useTermsOfUse, useDataConfirmationPopUp } from "@/store/hooks"

import styles from "../styles/form.module.scss"
import Link from "next/link"

export const ContentSignUp: TContentSignUp = ({}) => {
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const [isPass_, setIsPass_] = useState(false)
    const { on } = useToast()
    const dispatchPolicy = useTermsOfUse(({ dispatchPolicy }) => dispatchPolicy)
    const dispatchRules = useTermsOfUse(({ dispatchRules }) => dispatchRules)
    const dispatchDataConfirmation = useDataConfirmationPopUp(({ dispatchDataConfirmation }) => dispatchDataConfirmation)

    const {
        register,
        watch,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>()

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            setLoading(true)
            RegistrationService.registration({
                email: values.email,
                password: values.password,
                repeat: values.repeat_password,
            })
                .then((response) => {
                    if (response?.code === 409) {
                        setError("email", {
                            message: "user already exists",
                        })
                    }
                    if (response.ok) {
                        dispatchAuthModal({ visible: false })
                        dispatchDataConfirmation({
                            visible: true,
                            type: "register",
                        })
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
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
                                {errors.email && errors?.email?.message === "user already exists"
                                    ? "Пользователь уже существует"
                                    : errors?.email
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
                            rules={{ required: true, minLength: 5 }}
                            render={({ field }) => (
                                <div>
                                    <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                    <Image
                                        onClick={() => setIsPass((prev) => !prev)}
                                        src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                        alt="eye"
                                        width={20}
                                        height={20}
                                        data-eye
                                        unoptimized
                                    />
                                </div>
                            )}
                        />
                        {errors.password ? (
                            <i>
                                {errors.password?.message === "validate_register"
                                    ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                    : errors.password
                                    ? "Требуется пароль"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
                    <div data-label-input data-password>
                        <label htmlFor="repeat_password">
                            Подтвердите пароль <sup>*</sup>
                        </label>
                        <Controller
                            name="repeat_password"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 5,
                                validate: (value) => (value === watch("repeat_password") ? true : "no_repeat"),
                            }}
                            render={({ field }) => (
                                <div>
                                    <input {...field} placeholder="Введите пароль еще раз" type={isPass ? "text" : "password"} />
                                    <Image
                                        onClick={() => setIsPass_((prev) => !prev)}
                                        src={isPass_ ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                        alt="eye"
                                        width={20}
                                        height={20}
                                        data-eye
                                        unoptimized
                                    />
                                </div>
                            )}
                        />
                        {errors.repeat_password ? (
                            <i>
                                {errors?.repeat_password && errors?.repeat_password?.message === "no_repeat"
                                    ? "Пароли не совпадают"
                                    : errors?.repeat_password
                                    ? "Требуется пароль"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
                </section>
                <div className={styles.RememberChange}>
                    <div className={styles.checkRemember}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" defaultChecked={false} {...register("checkbox", { required: true })} className="" />
                            <span className={styles.checkmark}>
                                <Image src="/svg/check.svg" alt="check" width={16} height={16} unoptimized />
                            </span>
                        </label>
                        <p data-terms data-error={!!errors.checkbox}>
                            Регистрируясь, вы соглашаетесь с{" "}
                            <Link href={{ pathname: "/terms-rules" }} target="_blank">
                                Правилами пользования
                            </Link>{" "}
                            и{" "}
                            <Link href={{ pathname: "/terms-policy" }} target="_blank">
                                Политикой конфиденциальности
                            </Link>
                        </p>
                    </div>
                </div>
                <Button type="submit" typeButton="fill-primary" label="Зарегистрироваться" loading={loading} className="w-100" />
                <LinksSocial />
            </form>
            <section className={`${styles.Register} cursor-pointer`} onClick={() => dispatchAuthModal({ type: "SignIn" })}>
                <Image src="/svg/arrow-left.svg" alt="arrow" width={20} height={20} unoptimized />
                <p>Назад к странице входа</p>
            </section>
        </div>
    )
}
