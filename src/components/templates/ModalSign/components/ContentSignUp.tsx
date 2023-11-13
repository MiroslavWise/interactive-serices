"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { IValuesRegistrationForm, TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { ButtonFill } from "@/components/common/Buttons"
import { Input, InputPassword } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { useModalAuth, useTermsOfUse } from "@/store/hooks"
import { checkPasswordStrength, matchesUserName } from "@/helpers"
import { RegistrationService } from "@/services/auth/registrationService"

import styles from "../styles/form.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useModalAuth()
    const { dispatchPolicy, dispatchRules } = useTermsOfUse()
    const {
        register,
        watch,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>({
        mode: "onSubmit",
        reValidateMode: "onChange",
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        if (!loading) {
            if (!matchesUserName(values.email)) {
                return setError("email", { message: "email not valid" })
            }
            if (values.password !== values.repeat_password) {
                return setError("repeat_password", { message: "no_repeat" })
            }
            if (!values.checkbox) {
                return setError("checkbox", { message: "it's true?" })
            }
            if (!checkPasswordStrength(values.password)) {
                setError("password", { message: "validate_register" })
                return
            }
            setLoading(true)
            RegistrationService.registration({
                email: values.email,
                password: values.password,
                repeat: values.repeat_password,
            })
                .then((response) => {
                    if (response?.code === 409) {
                        setError("email", { message: "user already exists" })
                    }
                    if (response.ok) {
                        setVisibleAndType({ type: "SignIn" })
                        on(
                            {
                                message:
                                    "Вы успешно зарегистрировались. Зайдите на свою почту, что-бы по ссылке пройти верификацию!",
                            },
                            "success",
                        )
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
                onSubmit={handleSubmit(onRegister)}
                noValidate
            >
                <section className={styles.section}>
                    <Input
                        label="Email"
                        rules
                        type="email"
                        placeholder="Введите свой email"
                        {...register("email", { required: true })}
                        value={watch("email")}
                        onChange={(event) =>
                            setValue("email", event.target.value)
                        }
                        error={
                            errors.email &&
                            errors?.email?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors?.email
                                ? "Требуется email"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        {...register("password", {
                            required: true,
                            minLength: 5,
                        })}
                        value={watch("password")}
                        onChange={(event) =>
                            setValue("password", event.target.value)
                        }
                        error={
                            errors.password?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Подтвердите пароль"
                        rules
                        placeholder="Введите пароль еще раз"
                        {...register("repeat_password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                value === watch("repeat_password")
                                    ? true
                                    : "no_repeat",
                        })}
                        value={watch("repeat_password")}
                        onChange={(event) =>
                            setValue("repeat_password", event.target.value)
                        }
                        error={
                            errors?.repeat_password &&
                            errors?.repeat_password?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.repeat_password
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
                                {...register("checkbox", { required: true })}
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
                        <p data-terms data-error={!!errors.checkbox}>
                            Регистрируясь, вы соглашаетесь с{" "}
                            <a onClick={() => dispatchRules({ visible: true })}>
                                Правилами пользования
                            </a>{" "}
                            и{" "}
                            <a
                                onClick={() =>
                                    dispatchPolicy({ visible: true })
                                }
                            >
                                Политикой конфиденциальности
                            </a>
                        </p>
                    </div>
                </div>
                <ButtonFill
                    disabled={loading}
                    label="Зарегистрироваться"
                    classNames="w-100"
                    type="primary"
                    submit="submit"
                />
                <LinksSocial />
            </form>
            <section
                className={`${styles.Register} cursor-pointer`}
                onClick={() => setVisibleAndType({ type: "SignIn" })}
            >
                <Image
                    src="/svg/arrow-left.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                />
                <p>Назад к странице входа</p>
            </section>
        </div>
    )
}
