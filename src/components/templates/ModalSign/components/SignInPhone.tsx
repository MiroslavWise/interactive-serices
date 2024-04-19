import { useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { resolverPhoneSigIn, TSchemaPhoneSignIn } from "../utils/phone-sign-in.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services/auth"
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
    clearErrors,
  } = useForm<TSchemaPhoneSignIn>({ defaultValues: { phone: "" }, resolver: resolverPhoneSigIn })

  function onEnter(values: TSchemaPhoneSignIn) {
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
          setError("phone", { message: functionAuthErrors(errorMessage) })
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
              {...register("phone", { required: true })}
              onChange={(event) => {
                setValue("phone", String(event.target.value).trim().replaceAll(/[^\d]/g, ""))
                clearErrors("phone")
              }}
              maxLength={14}
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
