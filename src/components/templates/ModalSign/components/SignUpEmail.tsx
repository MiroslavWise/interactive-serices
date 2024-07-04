import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { ReactNode, memo, useState } from "react"

import { resolverEmailSignUp, TSchemaEmailSignUp } from "../utils/email-sign-up.schema"

import { Button } from "@/components/common"

import { getUserEmail } from "@/services"
import { dispatchAuthModalCreatePassword, dispatchAuthModalCurrentUser, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const SignUpEmail = memo(function ({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const email = useModalAuth(({ email }) => email)
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<TSchemaEmailSignUp>({
    defaultValues: {
      email: email || "",
      agree: false,
      marketing: false,
    },
    resolver: resolverEmailSignUp,
  })

  const onRegister = async (values: TSchemaEmailSignUp) => {
    if (!loading) {
      setLoading(true)
      getUserEmail(values.email!).then((response) => {
        const { data, error } = response
        console.log("response getEmailUser: ", response)
        if (!!data) {
          dispatchAuthModalCurrentUser({ user: data })
        } else {
          if (error?.message === "user not found") {
            dispatchAuthModalCreatePassword({
              email: values.email,
              agree: !!values.agree,
              marketing: !!values.marketing,
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
        <Controller
          name="agree"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.checkRemember}>
              <label className={styles.checkbox} data-check={!!field.value}>
                <input type="checkbox" onClick={() => setValue(field.name, !field.value)} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на обработку персональных данных в соответствии с&nbsp;
                <Link href={{ pathname: "/legal/privacy-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
                  Политикой конфиденциальности
                </Link>
              </p>
            </div>
          )}
        />
        <Controller
          name="marketing"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.checkRemember}>
              <label className={styles.checkbox} data-check={!!field.value}>
                <input type="checkbox" onClick={() => setValue(field.name, !field.value)} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на&nbsp;
                <Link href={{ pathname: "/legal/ads-agreement" }} target="_blank">
                  маркетинговые коммуникации
                </Link>
              </p>
            </div>
          )}
        />
      </div>
      <Button
        type="submit"
        typeButton="fill-primary"
        label="Зарегистрироваться"
        loading={loading}
        disabled={!watch("agree") || !watch("email")}
        data-test="sign-up-email-submit"
      />
      {children}
    </form>
  )
})
