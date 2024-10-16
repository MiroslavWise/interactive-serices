import { type ReactNode, useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { resolverEmailSignIn, TSchemaEmailSignIn } from "../utils/email-sign-in.schema"

import { Button } from "@/components/common"

import { clg } from "@console"
import { useToast } from "@/helpers/hooks/useToast"
import { functionAuthErrors, serviceAuthErrors } from "@/services"
import { dispatchCloseModalAuth, dispatchLoginTokenData } from "@/store"

import styles from "../styles/form.module.scss"

export const SignInEmail = ({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [isPass, setIsPass] = useState(false)
  const { on } = useToast()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TSchemaEmailSignIn>({
    resolver: resolverEmailSignIn,
  })

  async function onEnter(value: TSchemaEmailSignIn) {
    if (!loading) {
      setLoading(true)

      const response = await dispatchLoginTokenData({ email: value.email, password: value.password })
      clg("onEnter :", response, "error")
      setLoading(false)
      if (!!response?.error?.message) {
        const errorMessage = String(response?.error?.message)?.toLowerCase()
        if (errorMessage === "password is not match" || errorMessage === "password is incorrect") {
          setError("password", { message: serviceAuthErrors.get("password is not match")! })
          return
        }
        if (errorMessage.includes("password too weak")) {
          setError("password", { message: serviceAuthErrors.get("password too weak") })
          return
        }
        if (serviceAuthErrors.has(errorMessage)) {
          setError("email", { message: serviceAuthErrors.get(errorMessage!) })
          return
        } else {
          setError("email", { message: functionAuthErrors(errorMessage) })
          return
        }
      }
      if (!!response?.error && !response?.ok) {
        console.log("ERROR ---У нас возникла ошибка, мы сейчас её решаем!---", response?.error)
        on({ message: "У нас возникла ошибка, мы сейчас её решаем!" }, "warning")
        return
      }
      if (!!response?.res) {
        dispatchCloseModalAuth()
      }
    }
  }

  const submit = handleSubmit(onEnter)

  return (
    <form onSubmit={submit}>
      <section className={styles.section}>
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <div data-label-input data-test="sign-in-email">
              <label htmlFor={field.name}>Email</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Введите свой email"
                inputMode="email"
                {...field}
                data-error={!!errors.email}
              />
              {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 5 }}
          render={({ field }) => (
            <div data-label-input data-password data-test="sign-in-password">
              <label htmlFor={field.name}>Пароль</label>
              <div>
                <input {...field} autoComplete="off" placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                <img
                  onClick={() => setIsPass((prev) => !prev)}
                  src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                  data-eye
                />
              </div>
              {!!errors?.password ? <i>{errors?.password?.message}</i> : null}
            </div>
          )}
        />
      </section>
      {itemForgot}
      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-test="sign-in-email-submit" />
      {children}
    </form>
  )
}
