"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

import type { IValuesRegistrationForm, TContentSignUp } from "./types/types"

import { LinksSocial } from "./components/LinksSocial"
import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"

import { checkPasswordStrength, regExEmail } from "@/helpers"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { RegistrationService } from "@/services/auth/registrationService"

import styles from "../styles/style.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
    const [loading, setLoading] = useState(false)
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const {
        register,
        watch,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>()

    const onSuccess = (value: string) =>
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

    const onRegister = async (values: IValuesRegistrationForm) => {
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
                    onSuccess(
                        "Вы успешно зарегистрировались. Зайдите на свою почту, что-бы по ссылке пройти верификацию!",
                    )
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                <section className={styles.section}>
                    <LabelInputGroup
                        label="Email"
                        rules
                        placeholder="Введите свой email"
                        type="text"
                        propsInput={register("email", {
                            required: true,
                            validate: (value) =>
                                regExEmail.test(value)
                                    ? true
                                    : "validate_email",
                        })}
                        errorMessage={
                            errors.email &&
                            errors?.email?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors?.email
                                ? "Требуется email"
                                : ""
                        }
                    />
                    <LabelInputGroup
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        type="password"
                        propsInput={register("password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                checkPasswordStrength(value)
                                    ? true
                                    : "validate_register",
                        })}
                        errorMessage={
                            errors.password?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                    <LabelInputGroup
                        label="Подтвердите пароль"
                        rules
                        placeholder="Введите пароль еще раз"
                        type="password"
                        propsInput={register("repeat_password", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                value === watch("password")
                                    ? true
                                    : "no_repeat",
                        })}
                        errorMessage={
                            errors?.repeat_password &&
                            errors?.repeat_password?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.repeat_password
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                </section>
                <p>
                    Регистрируясь, вы соглашаетесь с{" "}
                    <a>Правилами пользования</a> и{" "}
                    <a>Политикой конфиденциальности</a>
                </p>
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
