"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { IValuesRegistrationForm, TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Segments } from "@/components/common"

import { VALUES_EMAIL_PHONE } from "../constants/segments"
import {
    dispatchAuthModal,
    dispatchAuthModalCreatePassword,
    dispatchIModalAuthEmailOrPhone,
    useModalAuth,
    useModalAuthEmailOrPhone,
} from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const email = useModalAuth(({ email }) => email)
    const phone = useModalAuth(({ phone }) => phone)

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IValuesRegistrationForm>({
        defaultValues: {
            email: email || "",
            phone: phone || "",
            checkbox: false,
        },
    })

    const onRegister = async (values: IValuesRegistrationForm) => {
        dispatchAuthModalCreatePassword({
            email: values.email,
            phone: values.phone,
        })

        // if (!loading) {
        //     setLoading(true)
        //     if (typeEmailOrPhone === "email") {
        //         RegistrationService.registration({
        //             email: values.email,
        //             // password: values.password,
        //             // repeat: values.repeat_password,
        //         })
        //             .then((response) => {
        //                 if (response?.code === 409) {
        //                     setError("email", {
        //                         message: "user already exists",
        //                     })
        //                 }
        //                 if (response.ok) {
        //                     dispatchAuthModal({ visible: false })
        //                     dispatchDataConfirmation({
        //                         visible: true,
        //                         type: "register",
        //                     })
        //                 }
        //             })
        //             .finally(() => {
        //                 setLoading(false)
        //             })
        //     } else if (typeEmailOrPhone === "phone") {
        //     }
        // }
    }

    return (
        <div className={styles.content}>
            <Segments
                type="primary"
                VALUES={VALUES_EMAIL_PHONE}
                active={VALUES_EMAIL_PHONE.find((item) => item.value === typeEmailOrPhone)!}
                setActive={(event) => {
                    dispatchIModalAuthEmailOrPhone(event.value)
                }}
                isBorder
            />
            <form onSubmit={handleSubmit(onRegister)}>
                <section className={styles.section}>
                    <div data-label-input>
                        <label htmlFor={typeEmailOrPhone}>
                            {typeEmailOrPhone === "email" ? "Электронная почта" : typeEmailOrPhone === "phone" ? "Телефон" : ""}
                        </label>
                        <Controller
                            name={typeEmailOrPhone}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    data-error={
                                        (typeEmailOrPhone === "email" && errors.email && true) ||
                                        (typeEmailOrPhone === "phone" && errors.phone && true)
                                    }
                                    type={typeEmailOrPhone === "email" ? "email" : typeEmailOrPhone === "phone" ? "tel" : "text"}
                                    placeholder={
                                        typeEmailOrPhone === "email"
                                            ? "email_address@mail.com"
                                            : typeEmailOrPhone === "phone"
                                            ? "+7 (000) 000-00-00"
                                            : ""
                                    }
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && typeEmailOrPhone === "email" ? (
                            <i>
                                {errors.email && errors?.email?.message === "user already exists"
                                    ? "Пользователь уже существует"
                                    : errors?.email
                                    ? "Требуется email"
                                    : errors.email
                                    ? "Какая-то ошибка с Email"
                                    : ""}
                            </i>
                        ) : errors.phone && typeEmailOrPhone === "phone" ? (
                            <i>
                                {errors.phone && errors?.phone?.message === "user already exists"
                                    ? "Пользователь уже существует"
                                    : errors?.phone
                                    ? "Требуется номер телефона, состоящий из 11 символов"
                                    : ""}
                            </i>
                        ) : null}
                    </div>
                </section>
                <div className={styles.RememberChange}>
                    <div className={styles.checkRemember}>
                        <label className={styles.checkbox} data-check={watch("checkbox")}>
                            <input type="checkbox" {...register("checkbox", { required: true })} />
                            <span className={styles.checkmark}>
                                <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={watch("checkbox")} />
                            </span>
                        </label>
                        <p data-terms data-error={!!errors.checkbox}>
                            Регистрируясь, вы соглашаетесь с{" "}
                            <Link href={{ pathname: "/terms-rules" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                                Правилами пользования
                            </Link>{" "}
                            и{" "}
                            <Link href={{ pathname: "/terms-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                                Политикой конфиденциальности
                            </Link>
                        </p>
                    </div>
                </div>
                <Button type="submit" typeButton="fill-primary" label="Зарегистрироваться"/>
                <LinksSocial />
            </form>
            <article data-column>
                <p>
                    Уже есть аккаунт? <a onClick={() => dispatchAuthModal({ type: "SignIn" })}>Войти</a>
                </p>
            </article>
        </div>
    )
}
