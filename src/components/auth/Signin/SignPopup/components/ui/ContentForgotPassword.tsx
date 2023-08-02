"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Image from "next/image"

import type { TContentForgotPassword } from "./types/types"

import { LabelInputGroup } from "./components/LabelInputGroup"
import { ButtonFill } from "@/components/common/Buttons"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { regExEmail } from "@/helpers"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"
import { cx } from "@/lib/cx"

import styles from "../styles/style.module.scss"

interface IValues {
  email: string
}

export const ContentForgotPassword: TContentForgotPassword = ({ setValueEmail }) => {
  const [loading, setLoading] = useState(false)
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IValues>()

  const onEnter = async (values: IValues) => {
    setLoading(true)
    useForgotPasswordHelper.forgotPassword({ email: values.email })
      .then(response => {
        console.log("response: ", response)
        if (response.ok && !!response?.res) {
          useForgotPasswordHelper.saveTemporaryToken(response.res?.password_reset_token)
          setValueEmail({ email: values.email, password_reset_expires: response.res?.password_reset_expires, password_reset_token: response?.res?.password_reset_token })
          setVisibleAndType({ type: "CodeVerification" })
        }
        if (response?.error?.code === 401) {
          setError("email", { message: "user is not verified" })
        }
        if (response?.error?.code === 404) {
          setError("email", { message: "user not found" })
        }
        if (response?.code && response?.code >= 500 && response?.code <= 599) {
          setError("email", { message: "something went wrong" })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
        <section className={styles.section}>
          <LabelInputGroup
            label="Email"
            rules
            placeholder="Введите свой email"
            type="text"
            propsInput={register("email", { required: true, validate: (value) => regExEmail.test(value) })}
            errorMessage={
              errors.email && errors?.email?.message === "user is not verified"
                ? "Пользователь не верифицирован"
                : errors.email && errors?.email?.message === "user not found"
                  ? "Пользователя не существует"
                  : errors.email && errors?.email?.message === "something went wrong"
                    ? "У нас проблемы с сервером, извините :("
                    : errors.email
                      ? "Требуется email" : ""}
          />
        </section>
        <ButtonFill
          disabled={loading}
          label="Сброс пароля"
          classNames="w-100"
          type="primary"
          submit="submit"
        />
      </form>
      <section className={cx(styles.Register, "cursor-pointer")} onClick={() => setVisibleAndType({ type: "SignIn" })}>
        <Image
          src="/svg/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
        />
        <p>Назад к странице входа</p>
      </section>
    </motion.div>
  )
}