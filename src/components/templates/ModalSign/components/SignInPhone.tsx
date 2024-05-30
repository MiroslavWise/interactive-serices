import { useForm } from "react-hook-form"
import { DispatchWithoutAction, type ReactNode, memo, useState } from "react"

import { resolverPhoneSigIn, TSchemaPhoneSignIn } from "../utils/phone-sign-in.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services"
import { dispatchAuthModal, dispatchAuthModalCodeVerification, dispatchStartTimer } from "@/store"

import styles from "../styles/form.module.scss"

const messageRegister = ({ cb }: { cb: DispatchWithoutAction }) => (
  <i>
    Аккаунт с данным номером не найден. Пройдите <a onClick={cb}>регистрацию</a>
  </i>
)

export const SignInPhone = ({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) => {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    setError,
    watch,
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<TSchemaPhoneSignIn>({ defaultValues: { phone: "" }, resolver: resolverPhoneSigIn })

  const onRegister = () => dispatchAuthModal({ type: "SignUp" })

  const submit = handleSubmit(function (values) {
    if (!loading) {
      setLoading(true)
      const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

      serviceAuth.phone({ phone: phoneReplace }).then((response) => {
        if (response?.ok) {
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: "SignIn" })
          }
        } else {
          const errorMessage = response?.error?.message
          if (errorMessage === "must agree") {
            setError("phone", { type: "on_register" })
          } else {
            setError("phone", { message: functionAuthErrors(errorMessage) })
          }
        }
        console.log(" serviceAuth phone: ", response)
        setLoading(false)
      })
    }
  })

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
              {...register("phone", { required: true })}
              onChange={(event) => {
                setValue("phone", String(event.target.value).trim().replaceAll(/[^\d]/g, ""))
                clearErrors("phone")
              }}
              maxLength={14}
            />
          </div>
          {!!errors.phone && errors.phone.type === "on_register" ? (
            messageRegister({ cb: onRegister })
          ) : !!errors.phone ? (
            <i>{errors?.phone?.message}</i>
          ) : null}
        </div>
      </section>
      {itemForgot}
      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-test="sign-in-phone-submit" />
      {children}
    </form>
  )
}
