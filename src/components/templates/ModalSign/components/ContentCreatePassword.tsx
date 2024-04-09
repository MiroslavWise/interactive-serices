import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { TValidateSchemaPassword, resolverPassword } from "../utils/password.schema"

import { Button } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { useForgotPasswordHelper, usePush } from "@/helpers"
import { functionAuthErrors, RegistrationService } from "@/services"
import { dispatchAuthModal, dispatchAuthModalInformationCreateAccount, useModalAuth, useModalAuthEmailOrPhone } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentCreatePassword = () => {
  const { handleReplace } = usePush()
  const { on } = useToast()
  const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
  const [isPass, setIsPass] = useState(false)
  const [isPass_, setIsPass_] = useState(false)
  const [loading, setLoading] = useState(false)
  const type = useModalAuth(({ type }) => type)
  const codeReset = useModalAuth(({ codeReset }) => codeReset)
  const email = useModalAuth(({ email }) => email)

  const { control, handleSubmit, setError, watch } = useForm<TValidateSchemaPassword>({
    resolver: resolverPassword,
  })

  async function onEnter(values: TValidateSchemaPassword) {
    if (!loading) {
      setLoading(true)
      if (type === "ResetPassword" && !!codeReset) {
        useForgotPasswordHelper
          .resetPassword({
            token: codeReset,
            password: values.password,
            repeat: values.repeat_password,
          })
          .then((response) => {
            setLoading(false)
            if (response.ok) {
              on({
                message: "Пароль успешно изменён. Вы можете войти на аккаунт!",
              })
              dispatchAuthModal({ type: "SignIn" })
            } else {
              const errorMessage = response?.error?.message
              if (response?.error.code === 400) {
                setError("repeat_password", { message: functionAuthErrors(errorMessage) })
                return
              } else if ([401 || 403].includes(response?.error?.code!)) {
                on({ message: "Время восстановления пароля истекло" }, "warning")
                handleReplace("/")
                return
              } else if (response?.error.code === 500) {
                on(
                  {
                    message: "Извините, у нас какиe-то ошибки. Мы работаем над этим :(",
                  },
                  "error",
                )
                return
              } else {
                setError("repeat_password", { message: functionAuthErrors(errorMessage) })
              }
            }
          })
      }
      if (!!email && typeEmailOrPhone === "email") {
        RegistrationService.registration({
          email: email,
          password: values.password!,
          repeat: values.repeat_password!,
        })
          .then((response) => {
            if (response.ok) {
              if (response.res) {
                dispatchAuthModalInformationCreateAccount(email)
                setLoading(false)
              }
            } else {
              setError("password", {
                message: functionAuthErrors(response?.error?.message!),
              })
              setLoading(false)
            }
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.content}>
      <p>Придумайте пароль для входа в аккаунт</p>
      <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
        <>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <div data-label-input data-password data-test="create-password">
                <label htmlFor={field.name}>Пароль</label>
                <div>
                  <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} minLength={6} />
                  <img
                    onClick={() => setIsPass((prev) => !prev)}
                    src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                    alt="eye"
                    width={20}
                    height={20}
                    data-eye
                  />
                </div>
                {error ? <i>{error?.message}</i> : null}
              </div>
            )}
          />
        </>
        <Controller
          name="repeat_password"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-password data-test="create-password-repeat">
              <label htmlFor={field.name}>Подтвердите пароль</label>
              <div>
                <input {...field} placeholder="Введите пароль еще раз" type={isPass_ ? "text" : "password"} minLength={6} />
                <img
                  onClick={() => setIsPass_((prev) => !prev)}
                  src={isPass_ ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                  data-eye
                />
              </div>
              {error ? <i>{error?.message}</i> : null}
            </div>
          )}
        />
        <Button
          style={{ marginTop: "1rem" }}
          type="submit"
          typeButton="fill-primary"
          label="Продолжить"
          loading={loading}
          disabled={watch("password") !== watch("repeat_password")}
          data-test="create-password-submit"
        />
      </form>
    </div>
  )
}
