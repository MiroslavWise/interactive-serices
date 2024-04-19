import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { resolverPhoneSignUp, TSchemaPhoneSignUp } from "../utils/phone-sign-up.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services/auth"
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
    clearErrors,
    control,
  } = useForm<TSchemaPhoneSignUp>({
    defaultValues: {
      phone: phone,
    },
    resolver: resolverPhoneSignUp,
  })

  const onRegister = async (values: TSchemaPhoneSignUp) => {
    if (!loading) {
      setLoading(true)
      const phoneReplace = String(values.phone).replaceAll(/[^\d]/g, "")

      serviceAuth
        .phone({
          phone: phoneReplace,
        })
        .then((response) => {
          console.log("response: ", response)
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: "SignUp" })
          } else {
            const errorMessage = response?.error?.message
            setError("phone", { message: functionAuthErrors(errorMessage) })
          }
          setLoading(false)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-test="sign-up-phone">
              <label htmlFor={field.name} title="Телефон">
                Телефон
              </label>
              <div
                data-phone-div
                data-error={!!errors?.phone}
                onClick={(event) => {
                  event.stopPropagation()
                  setFocus("phone")
                }}
              >
                {!!field.value && !["8", "+", 8].includes(field.value[0]) ? <span>+</span> : null}
                <input
                  data-input-phone
                  placeholder="+7 999 000-00-00"
                  type="text"
                  inputMode="numeric"
                  {...field}
                  title="Ввод номера"
                  onChange={(event) => {
                    field.onChange(String(event.target.value).trim().replaceAll(/[^\d]/g, ""))
                    clearErrors("phone")
                  }}
                />
              </div>
              {!!error ? <i>{error?.message}</i> : null}
            </div>
          )}
        />
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
            &nbsp;и&nbsp;
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
        data-test="sign-up-phone-submit"
      />
      {children}
    </form>
  )
})
