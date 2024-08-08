import { Controller, useForm } from "react-hook-form"
import { DispatchWithoutAction, type ReactNode, useState } from "react"

import { EnumSign } from "@/types/enum"
import { resolverPhoneSigIn, TSchemaPhoneSignIn } from "../utils/phone-sign-in.schema"

import { Button } from "@/components/common"
import InputCountry from "@/components/common/Forward/InputCountry"

import { functionAuthErrors, serviceAuth } from "@/services"
import { dispatchAuthModal, dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

const messageRegister = ({ cb }: { cb: DispatchWithoutAction }) => (
  <i>
    Аккаунт с данным номером не найден. Пройдите <a onClick={cb}>регистрацию</a>
  </i>
)

export const SignInPhone = ({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<TSchemaPhoneSignIn>({ defaultValues: { phone: phone }, resolver: resolverPhoneSigIn })

  const onRegister = () => dispatchAuthModal({ type: EnumSign.SignUp })

  const submit = handleSubmit(function (values) {
    if (!loading) {
      setLoading(true)
      const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

      serviceAuth.phone({ phone: phoneReplace }).then((response) => {
        console.log(" serviceAuth phone: ", response)
        setLoading(false)
        if (response?.ok) {
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: EnumSign.SignIn })
          }
        } else {
          const errorMessage = response?.error?.message
          if (errorMessage === "must agree") {
            setError("phone", { type: "on_register" })
            return
          }
          if (["BadRequestException", "Bad Request"].includes(response?.error?.name)) {
            const errorMessage: string = String(
              Array.isArray(response?.error?.message) ? response?.error?.message[0] : response?.error?.message,
            )
            if (errorMessage.includes("phone must be longer than or equal")) {
              setError("phone", {
                message: `Длина номера телефона должна быть - ${errorMessage
                  .replace("phone must be longer than or equal to ", "")
                  .replace(" characters", "")} символов`,
              })
            }
            return
          } else {
            setError("phone", { message: functionAuthErrors(errorMessage) })
            return
          }
        }
      })
    }
  })

  return (
    <form onSubmit={submit}>
      <section className={styles.section}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div data-label-input data-test="sign-in-phone" className="relative z-40">
              <label htmlFor={field.name}>Телефон</label>
              <InputCountry
                {...field}
                replaceValue={(value) => {
                  field.onChange(value)
                }}
              />
              {!!errors.phone && errors.phone.type === "on_register" ? (
                messageRegister({ cb: onRegister })
              ) : !!errors.phone ? (
                <i>{errors?.phone?.message}</i>
              ) : null}
            </div>
          )}
        />
      </section>
      {itemForgot}
      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-test="sign-in-phone-submit" />
      {children}
    </form>
  )
}
