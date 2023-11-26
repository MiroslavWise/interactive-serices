"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"

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
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const [isPass_, setIsPass_] = useState(false)
    const { on } = useToast()
    const dispatchAuthModal = useModalAuth(
        ({ dispatchAuthModal }) => dispatchAuthModal,
    )
    const dispatchPolicy = useTermsOfUse(({ dispatchPolicy }) => dispatchPolicy)
    const dispatchRules = useTermsOfUse(({ dispatchRules }) => dispatchRules)
    const dispatchDataConfirmation = useDataConfirmationPopUp(
        ({ dispatchDataConfirmation }) => dispatchDataConfirmation,
    )

    const {
        register,
        watch,
        handleSubmit,
        setError,
        setValue,
        control,
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
                return setError("__rwersdf__asdfsadf__", {
                    message: "no_repeat",
                })
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
                        setError("__iremqwer__", {
                            message: "user already exists",
                        })
                    }
                    if (response.ok) {
                        dispatchAuthModal({ visible: false })
                        dispatchDataConfirmation({
                            visible: true,
                            type: "register",
                        })
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
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                <section className={styles.section}>
                    <div data-label-input>
                        <label>
                            Email <sup>*</sup>
                        </label>
                        <Controller
                            name="__iremqwer__"
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
                        {errors.__iremqwer__ ? (
                            <i>
                                {errors.__iremqwer__ &&
                                errors?.__iremqwer__?.message ===
                                    "user already exists"
                                    ? "Пользователь уже существует"
                                    : errors?.__iremqwer__
                                    ? "Требуется email"
                                    : errors.__iremqwer__
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
                            name="__wererfsdfwef__"
                            control={control}
                            rules={{ required: true, minLength: 5 }}
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
                        {errors.__wererfsdfwef__ ? (
                            <i>
                                {errors.__wererfsdfwef__?.message ===
                                "validate_register"
                                    ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                    : errors.__wererfsdfwef__
                                    ? "Требуется пароль"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
                    <div data-label-input data-password>
                        <label>
                            Подтвердите пароль <sup>*</sup>
                        </label>
                        <Controller
                            name="__rwersdf__asdfsadf__"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 5,
                                validate: (value) =>
                                    value === watch("__rwersdf__asdfsadf__")
                                        ? true
                                        : "no_repeat",
                            }}
                            render={({ field }) => (
                                <div>
                                    <input
                                        {...field}
                                        placeholder="Введите пароль еще раз"
                                        type={isPass ? "text" : "password"}
                                    />
                                    <Image
                                        onClick={() =>
                                            setIsPass_((prev) => !prev)
                                        }
                                        src={
                                            isPass_
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
                        {errors.__rwersdf__asdfsadf__ ? (
                            <i>
                                {errors?.__rwersdf__asdfsadf__ &&
                                errors?.__rwersdf__asdfsadf__?.message ===
                                    "no_repeat"
                                    ? "Пароли не совпадают"
                                    : errors?.__rwersdf__asdfsadf__
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
                                {...register("checkbox", { required: true })}
                                className=""
                            />
                            <span className={styles.checkmark}>
                                <Image
                                    src="/svg/check.svg"
                                    alt="check"
                                    width={16}
                                    height={16}
                                    unoptimized
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
                    unoptimized
                />
                <p>Назад к странице входа</p>
            </section>
        </div>
    )
}
