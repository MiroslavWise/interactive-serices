import Link from "next/link"
import { useForm } from "react-hook-form"
import { ReactNode, memo, useState } from "react"

import { resolverEmailSignUp, TSchemaEmailSignUp } from "../utils/email-sign-up.schema"

import { Button } from "@/components/common"

import { getUserEmail } from "@/services"
import { dispatchAuthModalCreatePassword, dispatchAuthModalCurrentUser, useModalAuth, useUTM } from "@/store"

import styles from "../styles/form.module.scss"

export const SignUpEmail = memo(function SignUpEmail({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const email = useModalAuth(({ email }) => email)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSchemaEmailSignUp>({
    defaultValues: {
      email: email || "",
    },
    resolver: resolverEmailSignUp,
  })

  const onRegister = async (values: TSchemaEmailSignUp) => {
    if (!loading) {
      setLoading(true)
      getUserEmail(values.email!).then((response) => {
        console.log("response getEmailUser: ", response)
        if (response.ok) {
          if (response.res) {
            dispatchAuthModalCurrentUser({ user: response?.res })
          }
        } else {
          if (response?.error?.message === "user not found") {
            dispatchAuthModalCreatePassword({
              email: values.email,
            })
          }
        }
        setLoading(false)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <div data-label-input data-test="sign-up-email">
          <label htmlFor="email">Электронная почта</label>
          <input
            data-error={!!errors.email}
            type="text"
            placeholder="email_address@mail.com"
            inputMode="email"
            {...register("email", { required: true })}
          />
          {!!errors.email ? <i>{errors?.email?.message}</i> : null}
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
            Регистрируясь, вы соглашаетесь с&nbsp;
            <Link href={{ pathname: "/terms-rules" }} target="_blank" rel="license" referrerPolicy="no-referrer">
              Правилами пользования
            </Link>
            ,&nbsp;
            <Link href={{ pathname: "/terms-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
              Политикой конфиденциальности
            </Link>
            {/* &nbsp;и&nbsp;
            <Link href={{ pathname: "/terms-consent-to-receive-mailings" }} target="_blank" rel="license" referrerPolicy="no-referrer">
              Согласие на получение рассылки
            </Link> */}
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
        disabled={!watch("checkbox") || !watch("email") || !watch("checkbox_personal_data") || !!errors.email}
        data-test="sign-up-email-submit"
      />
      {children}
    </form>
  )
})
