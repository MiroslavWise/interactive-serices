"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { IValuesRegistrationForm, TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { Button, Segments } from "@/components/common"

import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { dispatchAuthModal, dispatchAuthModalCreatePassword, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
    const email = useModalAuth(({ email }) => email)
    const phone = useModalAuth(({ phone }) => phone)
    const [stateSegment, setStateSegment] = useState(VALUES_EMAIL_PHONE[0])

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
        //     if (stateSegment.value === "email") {
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
        //     } else if (stateSegment.value === "phone") {
        //     }
        // }
    }

    return (
        <div className={styles.content}>
            <Segments type="primary" VALUES={VALUES_EMAIL_PHONE} active={stateSegment} setActive={setStateSegment} isBorder />
            <form onSubmit={handleSubmit(onRegister)}>
                <section className={styles.section}>
                    <div data-label-input>
                        <label htmlFor={stateSegment.value}>
                            {stateSegment.value === "email" ? "Электронная почта" : stateSegment.value === "phone" ? "Телефон" : ""}
                        </label>
                        <Controller
                            name={stateSegment.value}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    data-error={
                                        (stateSegment.value === "email" && errors.email && true) ||
                                        (stateSegment.value === "phone" && errors.phone && true)
                                    }
                                    type={stateSegment.value === "email" ? "email" : stateSegment.value === "phone" ? "tel" : "text"}
                                    placeholder={
                                        stateSegment.value === "email"
                                            ? "email_address@mail.com"
                                            : stateSegment.value === "phone"
                                            ? "+7 (000) 000-00-00"
                                            : ""
                                    }
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && stateSegment.value === "email" ? (
                            <i>
                                {errors.email && errors?.email?.message === "user already exists"
                                    ? "Пользователь уже существует"
                                    : errors?.email
                                    ? "Требуется email"
                                    : errors.email
                                    ? "Какая-то ошибка с Email"
                                    : ""}
                            </i>
                        ) : errors.phone && stateSegment.value === "phone" ? (
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
                                <img src="/svg/check.svg" alt="check" width={16} height={16} />
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
                <Button type="submit" typeButton="fill-primary" label="Зарегистрироваться" className="w-100" />
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
