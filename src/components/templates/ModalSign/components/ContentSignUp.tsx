"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { IValuesRegistrationForm, TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Input, InputPassword } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import {
    useModalAuth,
    useTermsOfUse,
    useDataConfirmationPopUp,
} from "@/store/hooks"
import { checkPasswordStrength, matchesUserName } from "@/helpers"
import { RegistrationService } from "@/services/auth/registrationService"

import styles from "../styles/form.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
    const { on } = useToast()
    const [loading, setLoading] = useState(false)
    const { dispatchAuthModal } = useModalAuth((_) => ({
        dispatchAuthModal: _.dispatchAuthModal,
    }))
    const { dispatchPolicy, dispatchRules } = useTermsOfUse((_) => ({
        dispatchPolicy: _.dispatchPolicy,
        dispatchRules: _.dispatchRules,
    }))
    const { dispatchDataConfirmation } = useDataConfirmationPopUp((_) => ({
        dispatchDataConfirmation: _.dispatchDataConfirmation,
    }))
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
            if (!matchesUserName(values.__iremqwer__)) {
                return setError("__iremqwer__", { message: "email not valid" })
            }
            if (values.__wererfsdfwef__ !== values.__rwersdf__asdfsadf__) {
                return setError("__rwersdf__asdfsadf__", { message: "no_repeat" })
            }
            if (!values.checkbox) {
                return setError("checkbox", { message: "it's true?" })
            }
            if (!checkPasswordStrength(values.__wererfsdfwef__)) {
                setError("__wererfsdfwef__", { message: "validate_register" })
                return
            }
            setLoading(true)
            RegistrationService.registration({
                email: values.__iremqwer__,
                password: values.__wererfsdfwef__,
                repeat: values.__rwersdf__asdfsadf__,
            })
                .then((response) => {
                    if (response?.code === 409) {
                        setError("__iremqwer__", { message: "user already exists" })
                    }
                    if (response.ok) {
                        dispatchAuthModal({ visible: false })
                        dispatchDataConfirmation({
                            visible: true,
                            type: "register",
                        })
                        // on(
                        //     {
                        //         message:
                        //             "Вы успешно зарегистрировались. Зайдите на свою почту, что-бы по ссылке пройти верификацию!",
                        //     },
                        //     "success",
                        // )
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
                        {...register("__iremqwer__", { required: true })}
                        value={watch("__iremqwer__")}
                        onChange={(event) =>
                            setValue("__iremqwer__", event.target.value)
                        }
                        error={
                            errors.__iremqwer__ &&
                            errors?.__iremqwer__?.message === "user already exists"
                                ? "Пользователь уже существует"
                                : errors?.__iremqwer__
                                ? "Требуется email"
                                : errors.__iremqwer__
                                ? "Какая-то ошибка с Email"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Пароль"
                        rules
                        placeholder="Введите свой пароль"
                        {...register("__wererfsdfwef__", {
                            required: true,
                            minLength: 5,
                        })}
                        value={watch("__wererfsdfwef__")}
                        onChange={(event) =>
                            setValue("__wererfsdfwef__", event.target.value)
                        }
                        error={
                            errors.__wererfsdfwef__?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.__wererfsdfwef__
                                ? "Требуется пароль"
                                : ""
                        }
                    />
                    <InputPassword
                        label="Подтвердите пароль"
                        rules
                        placeholder="Введите пароль еще раз"
                        {...register("__rwersdf__asdfsadf__", {
                            required: true,
                            minLength: 5,
                            validate: (value) =>
                                value === watch("__rwersdf__asdfsadf__")
                                    ? true
                                    : "no_repeat",
                        })}
                        value={watch("__rwersdf__asdfsadf__")}
                        onChange={(event) =>
                            setValue("__rwersdf__asdfsadf__", event.target.value)
                        }
                        error={
                            errors?.__rwersdf__asdfsadf__ &&
                            errors?.__rwersdf__asdfsadf__?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.__rwersdf__asdfsadf__
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
                <Button
                    type="submit"
                    typeButton="fill-primary"
                    label="Зарегистрироваться"
                    loading={loading}
                    className="w-100"
                />
                <LinksSocial />
            </form>
            <section
                className={`${styles.Register} cursor-pointer`}
                onClick={() => dispatchAuthModal({ type: "SignIn" })}
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
