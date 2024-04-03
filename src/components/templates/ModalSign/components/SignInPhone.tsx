import { useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { resolverPhoneSigIn, TSchemaPhoneSignIn } from "../utils/phone-sign-in.schema"

import { Button } from "@/components/common"

import { serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const SignInPhone = memo(function SignInPhone({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    setError,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<TSchemaPhoneSignIn>({ defaultValues: { phone: "" }, resolver: resolverPhoneSigIn })

  function onEnter(values: TSchemaPhoneSignIn) {
    if (!loading) {
      setLoading(true)
      const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

      serviceAuth.phone({ phone: phoneReplace }).then((response) => {
        if (response?.ok) {
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id! })
          }
        } else {
          if (response?.error?.message === "user already exists") {
            setError("phone", { message: "Пользователь уже существует" })
          } else if (response?.error?.message === "user not found") {
            setError("phone", { message: "Данного пользователя не существует" })
          } else if (response?.error?.message === "invalid parameters") {
            setError("phone", { message: "Не верные данные или данного номер не существует" })
          }
        }
        console.log(" serviceAuth phone: ", response)
        setLoading(false)
      })
    }
  }

  const submit = handleSubmit(onEnter)

  return (
    <form onSubmit={submit}>
      <section className={styles.section}>
        <div data-label-input data-test="sign-in-phone">
          <label htmlFor="phone">Телефон</label>
          <div data-phone-div data-error={!!errors?.phone}>
            {!!watch("phone") && !["8", "+", 8].includes(`${watch("phone")}`[0]) ? <span>+</span> : null}
            <input
              data-input-phone
              placeholder="+7 999 000-00-00"
              type="tel"
              inputMode="numeric"
              {...register("phone", { required: true, minLength: 11, maxLength: 16 })}
              onChange={(event) => {
                setValue("phone", String(event.target.value).trim().replaceAll(/[^\d]/g, ""))
              }}
              maxLength={16}
            />
          </div>
          {!!errors.phone ? <i>{errors?.phone?.message}</i> : null}
        </div>
      </section>
      {itemForgot}

      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-test="sign-in-phone-submit" />
      {children}
    </form>
  )
})
