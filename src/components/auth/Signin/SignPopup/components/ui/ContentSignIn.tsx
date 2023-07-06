"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Image from "next/image"

import type { TContentSignIn, IValuesSignForm } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"
import { LabelInputGroup } from "./components/LabelInputGroup"
import { LinksSocial } from "./components/LinksSocial"

import { regExEmail } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

import styles from "../styles/style.module.scss"

export const ContentSignIn: TContentSignIn = ({ setType, setVisible, setValueSecret }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IValuesSignForm>()
  const [loading, setLoading] = useState(false)

  const onEnter = async (values: IValuesSignForm) => {
    setLoading(true)
    useTokenHelper.login({
      email: values.email,
      password: values.password,
    })
      .then(response => {
        if (!!response?.res?.secret && !!response?.res?.otp_auth_url) {
          setValueSecret({
            secret: response?.res?.secret!,
            url: response?.res?.otp_auth_url!,
          })
          return setType("FirstLoginQR")
        }
        if (response.ok) {
          return setType("OtpCode")
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
            errorMessage={errors.email ? "Требуется email" : ""}
          />
          <LabelInputGroup
            label="Пароль"
            rules
            placeholder="Введите свой пароль"
            type="password"
            propsInput={register("password", { required: true })}
            errorMessage={errors.password ? "Требуется пароль" : ""}
          />
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
                <Image
                  src="/svg/check.svg"
                  alt="check"
                  width={16}
                  height={16}
                />
              </span>
            </label>
            <p>Запомнить на 30 дней</p>
          </div>
          <a onClick={() => setType("ForgotPassword")}>Забыли пароль?</a>
        </div>
        <ButtonFill
          label="Войти"
          classNames="w-100"
          type="primary"
          submit="submit"
          disabled={loading}
        />
        <LinksSocial />
      </form>
      <section className={styles.Register}>
        <p>Нет аккаунта?</p>
        <a onClick={() => setType("SignUp")}>Зарегистрироваться</a>
      </section>
    </motion.div>
  )
}