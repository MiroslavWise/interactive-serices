import Link from "next/link"
import { useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import type { IValuesRegistrationForm } from "../types/types"

import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const SignUpPhone = memo(function SignUpPhone({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    setValue,
    setError,
  } = useForm<IValuesRegistrationForm>({
    defaultValues: {
      phone: phone,
      checkbox: false,
      checkbox_personal_data: false,
    },
  })

  const onRegister = async (values: IValuesRegistrationForm) => {
    if (!loading) {
      setLoading(true)
      const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

      serviceAuth
        .phone({
          phone: phoneReplace,
        })
        .then((response) => {
          console.log("response: ", response)
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id! })
          } else {
            if (response?.error?.message === "user not found") {
              setError("phone", { message: "Данного пользователя не существует" })
            }
            if (response?.error?.message === "invalid parameters") {
              setError("phone", { message: "Не верные данные или данного номер не существует" })
            }
          }
          setLoading(false)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <div data-label-input>
          <label htmlFor="phone">Телефон</label>
          <div
            data-phone-div
            data-error={!!errors?.country || !!errors?.code || !!errors?.phone}
            onClick={(event) => {
              event.stopPropagation()
              setFocus("phone")
            }}
          >
            {!!watch("phone") && `${watch("phone")}`[0] !== "8" ? <span>+</span> : null}
            <input
              data-input-phone
              placeholder="+7 999 000-00-00"
              type="tel"
              inputMode="numeric"
              {...register("phone", { required: true, minLength: 11, maxLength: 16 })}
              maxLength={16}
            />
          </div>
          {!!errors.phone ? (
            <i>
              {errors.phone && errors?.phone?.message === "user already exists"
                ? "Пользователь уже существует"
                : errors.phone.type === "minLength"
                ? "Номер телефона состоит из 11 цифр"
                : errors?.phone?.type === "maxLength"
                ? "Номер имеет не более 11 цифр"
                : errors?.phone?.message}
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
            </Link>
            ,{" "}
            <Link href={{ pathname: "/terms-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
              Политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link href={{ pathname: "/terms-consent-to-receive-mailings" }} target="_blank" rel="license" referrerPolicy="no-referrer">
              Согласие на получение рассылки
            </Link>
          </p>
        </div>
        <div className={styles.checkRemember}>
          <label className={styles.checkbox} data-check={watch("checkbox_personal_data")}>
            <input type="checkbox" {...register("checkbox_personal_data", { required: true })} />
            <span className={styles.checkmark}>
              <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={watch("checkbox_personal_data")} />
            </span>
          </label>
          <p data-terms data-error={!!errors.checkbox_personal_data}>
            Я даю согласие на обработку персональных данных
          </p>
        </div>
      </div>
      <Button
        type="submit"
        typeButton="fill-primary"
        label="Зарегистрироваться"
        loading={loading}
        disabled={!watch("checkbox") || !watch("phone") || !watch("checkbox_personal_data")}
      />
      {children}
    </form>
  )
})
