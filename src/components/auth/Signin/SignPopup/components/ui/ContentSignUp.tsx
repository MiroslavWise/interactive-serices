"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Image from "next/image"

import type { IValuesRegistrationForm, TContentSignUp } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"
import { LinksSocial } from "./components/LinksSocial"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { RegistrationService } from "@/services/auth/registrationService"
import { regExEmail } from "@/helpers"
import { checkPasswordStrength } from "@/lib/checkPasswordStrength"

import styles from "../styles/style.module.scss"

export const ContentSignUp: TContentSignUp = ({ }) => {
  const [loading, setLoading] = useState(false)
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()
  const { register, watch, handleSubmit, setError, formState: { errors } } = useForm<IValuesRegistrationForm>()

  const onRegister = async (values: IValuesRegistrationForm) => {
    setLoading(true)
    RegistrationService.registration({
      email: values.email,
      password: values.password,
      repeat: values.repeat_password,
    })
      .then(response => {
        if (response?.code === 409) {
          setError("email", { message: "user already exists" })
        }
        if (!response.error && response.ok) {
          setVisibleAndType({ type: "SignIn" })
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
      <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
        <section className={styles.section}>
          <LabelInputGroup
            label="Email"
            rules
            placeholder="Введите свой email"
            type="text"
            propsInput={register("email", { required: true, validate: value => regExEmail.test(value) ? true : "validate_email" })}
            errorMessage={errors.email && errors?.email?.message === "user already exists" ? "Пользователь уже существует" : errors?.email ? "Требуется email" : ""}
          />
          <LabelInputGroup
            label="Пароль"
            rules
            placeholder="Введите свой пароль"
            type="password"
            propsInput={register("password", { required: true, minLength: 5, validate: value => checkPasswordStrength(value) ? true : "validate_register" })}
            errorMessage={
              errors.password?.message === "validate_register"
                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                : errors.password
                  ? "Требуется пароль" : ""
            }
          />
          <LabelInputGroup
            label="Подтвердите пароль"
            rules
            placeholder="Введите пароль еще раз"
            type="password"
            propsInput={register("repeat_password", { required: true, minLength: 5, validate: value => value === watch("password") ? true : "no_repeat" })}
            errorMessage={
              errors?.repeat_password && errors?.repeat_password?.message === "no_repeat"
                ? "Пароли не совпадают"
                : errors?.repeat_password
                  ? "Требуется пароль"
                  : ""
            }
          />
        </section>
        <p>Регистрируясь, вы соглашаетесь с <a>Правилами пользования</a> и <a>Политикой конфиденциальности</a></p>
        <ButtonFill
          disabled={loading}
          label="Зарегистрироваться"
          classNames="w-100"
          type="primary"
          submit="submit"
        />
        <LinksSocial />
      </form>
      <section className={`${styles.Register} cursor-pointer`} onClick={() => setVisibleAndType({ type: "SignIn" })}>
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