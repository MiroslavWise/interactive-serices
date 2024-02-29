import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/common"

import { RegistrationService, serviceAuthErrors } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { useForgotPasswordHelper, usePush } from "@/helpers"
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IValues>({
    defaultValues: {
      password: "",
      repeat_password: "",
    },
  })

  async function onEnter(values: IValues) {
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
            if (response.ok) {
              on({
                message: "Пароль успешно изменён. Вы можете войти на аккаунт!",
              })
              dispatchAuthModal({ type: "SignIn" })
            } else {
              if (response?.error.code === 400) {
                setError("repeat_password", { message: "no_repeat" })
              } else if (response?.error.code === 400) {
                setError("repeat_password", { message: "no_repeat" })
              } else if ([401 || 403].includes(response?.error?.code!)) {
                on({ message: "Время восстановления пароля истекло" }, "warning")
                handleReplace("/")
              } else if (response?.error.code === 500) {
                on(
                  {
                    message: "Извините, у нас какиe-то ошибки. Мы работаем над этим :(",
                  },
                  "error",
                )
              } else if (!response.ok) {
                setError("repeat_password", { message: response?.error?.message })
              }
            }
            setLoading(false)
          })
      }
      if (!!email && typeEmailOrPhone === "email") {
        if (values.password !== values.repeat_password) {
          setError("repeat_password", { message: "Пароли не совпадают" })
          setLoading(false)
          return
        }
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
                message: serviceAuthErrors.has(response?.error?.message)
                  ? serviceAuthErrors.get(response?.error?.message!)
                  : serviceAuthErrors.get("default"),
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
        <div data-label-input data-password>
          <label htmlFor="password">Пароль</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 5 }}
            render={({ field }) => (
              <div>
                <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                <img
                  onClick={() => setIsPass((prev) => !prev)}
                  src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                  data-eye
                />
              </div>
            )}
          />
          {errors.password ? (
            <i>
              {errors.password?.message === "validate_register"
                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                : errors.password?.message}
            </i>
          ) : null}
        </div>
        <Controller
          name="repeat_password"
          control={control}
          rules={{
            required: true,
            minLength: 5,
            validate: (value) => value === watch("password"),
          }}
          render={({ field }) => (
            <div data-label-input data-password>
              <label htmlFor={field.name}>Подтвердите пароль</label>
              <div>
                <input {...field} placeholder="Введите пароль еще раз" type={isPass ? "text" : "password"} />
                <img
                  onClick={() => setIsPass_((prev) => !prev)}
                  src={isPass_ ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                  data-eye
                />
              </div>
              {errors.repeat_password ? (
                <i>
                  {errors?.repeat_password?.type === "validate"
                    ? "Пароли не совпадают"
                    : errors.repeat_password.type === "minLength"
                    ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру  и не менее 5 символов"
                    : errors?.repeat_password?.message}
                </i>
              ) : null}
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
        />
      </form>
    </div>
  )
}

interface IValues {
  password: string
  repeat_password: string
}
