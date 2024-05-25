import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { resolverPhoneSignUp, TSchemaPhoneSignUp } from "../utils/phone-sign-up.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth, useUTM } from "@/store"

import styles from "../styles/form.module.scss"

export const SignUpPhone = memo(function SignUpPhone({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)

  const utm_source = useUTM(({ utm_source }) => utm_source)
  const utm_medium = useUTM(({ utm_medium }) => utm_medium)
  const utm_campaign = useUTM(({ utm_campaign }) => utm_campaign)
  const utm_content = useUTM(({ utm_content }) => utm_content)

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    setError,
    clearErrors,
    control,
setValue,
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

      const stringParams = new URLSearchParams()

      if (utm_source) {
        stringParams.set("utm_source", utm_source)
      }
      if (utm_medium) {
        stringParams.set("utm_medium", utm_medium)
      }
      if (utm_campaign) {
        stringParams.set("utm_campaign", utm_campaign)
      }
      if (utm_content) {
        stringParams.set("utm_content", utm_content)
      }

      const string = stringParams.toString()

      serviceAuth
        .phone({
          phone: phoneReplace,
          params: string ? string : undefined,
          agree: !!values.agree,
          marketing: !!values.marketing,
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
        <Controller
          name="agree"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.checkRemember}>
              <label className={styles.checkbox} data-check={!!field.value}>
                <input type="checkbox" onClick={() => setValue(field.name, !field.value} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на обработку персональных данных в соответствии с&nbsp;
                <Link href={{ pathname: "/terms-policy" }} target="_blank" rel="license" referrerPolicy="no-referrer">
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
                <input type="checkbox" onClick={() => setValue(field.name, !field.value} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на <a>маркетинговые коммуникации</a>
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
        disabled={!watch("agree") || !watch("phone")}
        data-test="sign-up-phone-submit"
      />
      {children}
    </form>
  )
})
