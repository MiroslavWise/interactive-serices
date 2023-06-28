"use client"

import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Image from "next/image"

import type { TContentForgotPassword } from "../types"

import { LabelInputGroup } from "./LabelInputGroup"
import { ButtonFill } from "@/components/common/Buttons"

import { regExEmail } from "@/helpers"

import styles from "./style.module.scss"

interface IValues {
  email: string
}

export const ContentForgotPassword: TContentForgotPassword = ({ setType }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IValues>()

  const onEnter = (values: IValues) => {

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
        </section>
        <ButtonFill
          label="Сброс пароля"
          classNames="w-100"
          type="primary"
          submit="submit"
        />
      </form>
      <section className={`${styles.Register} cursor-pointer`} onClick={() => setType("SignIn")}>
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