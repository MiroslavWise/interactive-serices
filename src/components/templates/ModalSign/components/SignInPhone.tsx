import { useForm, Controller } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { IValuesSignForm } from "../types/types"

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
  } = useForm<IValuesSignForm>({ defaultValues: { phone: "" } })

  function onEnter(values: IValuesSignForm) {
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
          if (response?.error?.message === "user not found") {
            setError("phone", { message: "Данного пользователя не существует" })
          }
          if (response?.error?.message === "invalid parameters") {
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
        <div data-label-input>
          <label htmlFor="phone">Телефон</label>
          <div data-phone-div data-error={!!errors?.country || !!errors?.code || !!errors?.phone}>
            {!!watch("phone") && !["8", "+", 8].includes(`${watch("phone")}`[0]) ? <span>+</span> : null}
            <input
              data-input-phone
              placeholder="+7 999 000-00-00"
              type="tel"
              inputMode="numeric"
              {...register("phone", { required: true, minLength: 11, maxLength: 16 })}
              onChange={(event) => {
                setValue("phone", event.target.value?.replaceAll(/[^\d]/g, ""))
              }}
              maxLength={16}
            />
          </div>
          {!!errors?.phone ? (
            <i>
              {errors.phone.type === "minLength"
                ? "Номер телефона состоит из 11 цифр"
                : errors?.phone?.type === "maxLength"
                ? "Номер имеет не более 11 цифр"
                : errors?.phone?.message}
            </i>
          ) : null}
        </div>
      </section>
      {itemForgot}

      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-button-submit-sign-in-phone />
      {children}
    </form>
  )
})
