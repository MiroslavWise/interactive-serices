import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { TValidateSchemaPassword, resolverPassword } from "../utils/password.schema"

import { Button } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { useForgotPasswordHelper, usePush } from "@/helpers"
import { functionAuthErrors, RegistrationService, serviceAuthErrors } from "@/services"
import { dispatchAuthModal, dispatchAuthModalInformationCreateAccount, useModalAuth, useModalAuthEmailOrPhone, useUTM } from "@/store"

import styles from "../styles/form.module.scss"
import DifficultyPassword from "./DifficultyPassword"

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
  const agree = useModalAuth(({ agree }) => agree)
  const marketing = useModalAuth(({ marketing }) => marketing)

  const utm_source = useUTM(({ utm_source }) => utm_source)
  const utm_medium = useUTM(({ utm_medium }) => utm_medium)
  const utm_campaign = useUTM(({ utm_campaign }) => utm_campaign)
  const utm_content = useUTM(({ utm_content }) => utm_content)

  const { control, handleSubmit, setError, watch, trigger } = useForm<TValidateSchemaPassword>({
    resolver: resolverPassword,
    defaultValues: {
      password: "",
      repeat: "",
    },
    reValidateMode: "onChange",
  })

  async function onEnter(values: TValidateSchemaPassword) {
    if (!loading) {
      setLoading(true)
      if (type === "ResetPassword" && !!codeReset) {
        useForgotPasswordHelper
          .resetPassword({
            token: codeReset,
            password: values.password,
            repeat: values.repeat,
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
                setError("password", { message: functionAuthErrors(errorMessage) })
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
                if (
                  (typeof errorMessage === "string" && errorMessage?.toLowerCase()?.includes("password is not strong enough")) ||
                  (Array.isArray(errorMessage) &&
                    errorMessage?.some((item) => item?.toLowerCase()?.includes("password is not strong enough")))
                ) {
                  setError("password", { message: functionAuthErrors("password is not strong enough") })
                }
              }
            }
          })
      }
      if (!!email && typeEmailOrPhone === "email") {
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

        RegistrationService.registration(
          {
            email: email,
            password: values.password!,
            repeat: values.repeat!,
            agree: !!agree,
            marketing: !!marketing,
          },
          string ? string : undefined,
        )
          .then((response) => {
            if (response.ok) {
              if (response.res) {
                dispatchAuthModalInformationCreateAccount(email)
                setLoading(false)
              }
            } else {
              setLoading(false)
              if (
                Array.isArray(response?.error?.message!) &&
                response?.error?.message?.some((item: string) =>
                  ["password is not strong enough", "repeat is not strong enough"].includes(item?.toLowerCase()),
                )
              ) {
                setError("password", { message: serviceAuthErrors.get("password is not strong enough") })
                return
              } else {
                setError("password", {
                  message: functionAuthErrors(response?.error?.message!),
                })
                return
              }
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

  const disabled = !watch("password") || !watch("repeat")

  return (
    <div className={styles.content}>
      <p>Придумайте пароль для входа в аккаунт</p>
      <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-password data-test="create-password">
              <label htmlFor={field.name}>Пароль</label>
              <div>
                <input
                  {...field}
                  placeholder="Введите пароль"
                  type={isPass ? "text" : "password"}
                  data-error={!!error}
                  onChange={(event) => {
                    field.onChange(event.target.value.replaceAll(" ", ""))
                    trigger(field.name)
                    trigger("repeat")
                  }}
                />
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
              <DifficultyPassword value={field.value.trim()} />
            </div>
          )}
        />
        <Controller
          name="repeat"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-password data-test="create-password-repeat">
              <label htmlFor={field.name}>Подтвердите пароль</label>
              <div>
                <input
                  {...field}
                  placeholder="Введите пароль еще раз"
                  type={isPass_ ? "text" : "password"}
                  data-error={!!error}
                  onChange={(event) => {
                    field.onChange(event.target.value.replaceAll(" ", ""))
                    trigger(field.name)
                  }}
                />
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
          disabled={disabled}
          data-test="create-password-submit"
        />
      </form>
    </div>
  )
}
