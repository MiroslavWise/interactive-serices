"use client";

import { type FC, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import type { TTypeSign } from "../types";

import { LabelInputGroup } from "./LabelInputGroup";
import { ButtonFill } from "components/Buttons";
import { LinksSocial } from "./LinksSocial";

import { URL } from "services/url";
import { regExEmail } from "lib/constants";

import styles from "./styles/style.module.scss";

interface IValues{
  email: string;
  number?: string;
  password: string;
  repeat_password: string;
}

type TContentSignUp = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export const ContentSignUp: TContentSignUp = ({ setType }) => {
  const { register, watch, handleSubmit, setError, formState: { errors } } = useForm<IValues>({
    defaultValues: {
      email: "",
      number: "",
      password: "",
      repeat_password: "",
    },
  })

  const onRegister = async (values: IValues) => {
    const data = {
      email: values.email,
      password: values.password,
      repeat: values.repeat_password,
    };
    try {
      const res = await fetch(`${URL}users`, {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const dataResponse = await res.json();
      if (dataResponse?.error && dataResponse?.error?.code === 409) {
        setError("email", {message: "user already exists"})
      }
      return dataResponse;
    } catch (e) {
      throw e;
    }
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
            propsInput={register("email", { required: true, validate: value => regExEmail.test(value) ? true : "validate_email" })}
            errorMessage={errors.email && errors?.email?.message === "user already exists" ? "Пользователь уже существует" : errors?.email ? "Требуется email" : ""}
          />
          <LabelInputGroup
            label="Номер телеграмма"
            placeholder="Введите свой номер"
            type="text"
            propsInput={register("number")}
          />
          <LabelInputGroup
            label="Пароль"
            rules
            placeholder="Введите свой пароль"
            type="password"
            propsInput={register("password", { required: true, minLength: 5})}
            errorMessage={errors.password ? "Требуется пароль" : ""}
          />
          <LabelInputGroup
            label="Подтвердите пароль"
            rules
            placeholder="Введите пароль еще раз"
            type="password"
            propsInput={register("repeat_password", { required: true, minLength: 5, validate: value => value === watch("password") ? true : "no_repeat"})}
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
          label="Зарегистрироваться"
          classNames="w-100"
          type="primary"
          submit="submit"
        />
        <LinksSocial />
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
    </div>
  )
}