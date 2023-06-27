"use client";

import { type FC, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import type { TTypeSign } from "../types";

import { LabelInputGroup } from "./LabelInputGroup"
import { ButtonFill } from "../../../components/Buttons";
import { LinksSocial } from "./LinksSocial";

import { regExEmail } from "../../../lib/constants";

import styles from "./styles/style.module.scss";

interface IValues {
  email: String;
  password: string;
  checkbox: boolean;
}

type TContentSignIn = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export const ContentSignIn: TContentSignIn = ({ setType }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IValues>();

  const onEnter = (values: IValues) => {
    console.log("values: ", values)
  }

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
        <section className={styles.section}>
          <LabelInputGroup
            label="Email"
            rules
            placeholder="Введите свой email"
            type="text"
            propsInput={register("email", { required: true, validate: (value) => regExEmail.test(value as string) })}
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
          <a>Забыли пароль?</a>
        </div>
        <ButtonFill
          label="Войти"
          classNames="w-100"
          type="primary"
          submit="submit"
        />
        <LinksSocial />
      </form>
      <section className={styles.Register}>
        <p>Нет аккаунта?</p>
        <a onClick={() => setType("SignUp")}>Зарегистрироваться</a>
      </section>
    </div>
  )
}