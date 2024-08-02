"use client"

import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/common"

import { resolverPassword, TKeysPassword, TSchemaPassword } from "./utils/password.schema"

import { dispatchChangePassword } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { postNewPassword, serviceAuthErrors } from "@/services"

function ChangePassword() {
  const [loading, setLoading] = useState(false)
  const [visiblePass, setVisiblePass] = useState<Record<TKeysPassword, boolean>>({
    oldPassword: false,
    password: false,
    repeat: false,
  })
  const { on } = useToast()

  const { watch, handleSubmit, control, setError, trigger } = useForm<TSchemaPassword>({
    resolver: resolverPassword,
    defaultValues: {
      oldPassword: "",
      password: "",
      repeat: "",
    },
    mode: "onChange",
  })

  const onSubmit = handleSubmit((data: TSchemaPassword) => {
    if (!loading) {
      setLoading(true)

      postNewPassword(data).then((response) => {
        console.log("response postNewPassword: ", response)
        if (response.ok) {
          on({ message: "Пароль успешно обновлён" })
          close()
        } else {
          const messageError = response.error?.message?.toLowerCase()
          if (serviceAuthErrors.has(messageError)) {
            if (messageError === "password is incorrect") {
              setError("oldPassword", { message: serviceAuthErrors.get(messageError) })
            }
            if (messageError === "password is not match") {
              setError("password", { message: serviceAuthErrors.get(messageError) })
            } else {
              setError("root", { message: messageError })
            }
          } else {
            setError("root", { message: messageError })
          }
        }
        setLoading(false)
      })
    }
  })

  function close() {
    dispatchChangePassword(false)
  }

  const onVisiblePassword = useCallback((value: TKeysPassword) => {
    setVisiblePass((prev) => ({
      ...prev,
      [value]: !prev[value],
    }))
  }, [])

  const disabled = !watch("oldPassword") || !watch("password") || !watch("repeat") || watch("password") !== watch("repeat")

  return (
    <>
      <header className="w-full h-[4.25rem] md:h-[4.75rem] p-5 md:py-6 px-5 max-md:pb-4 flex items-center justify-center border-b border-solid border-grey-separator">
        <h3 className="text-text-primary text-center text-2xl font-semibold">Изменение пароля</h3>
      </header>
      <form onSubmit={onSubmit} data-test="form-change-password" className="py-10 px-5 md:px-[3.75rem] flex flex-col gap-10">
        <p className="text-text-primary text-sm font-normal">Введите ваш текущий пароль для подтверждения аккаунта.</p>
        <article className="w-full flex flex-col gap-5">
          <Controller
            name="oldPassword"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test={`fieldset-change-password-${field.name}`}>
                <label htmlFor={field.name}>Старый пароль</label>
                <div data-input>
                  <input
                    {...field}
                    type={visiblePass.oldPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    data-error={!!error}
                    data-test={`input-change-password-${field.name}`}
                  />
                  <button type="button" onClick={() => onVisiblePassword(field.name)}>
                    <img src={visiblePass.oldPassword ? "/svg/eye.svg" : "/svg/eye-off.svg"} alt="eye" width={20} height={20} />
                  </button>
                </div>
                {error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="password"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <fieldset data-test={`fieldset-change-password-${field.name}`}>
                  <label htmlFor={field.name}>Пароль</label>
                  <div data-input>
                    <input
                      type={visiblePass.password ? "text" : "password"}
                      placeholder="Введите пароль"
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value.replaceAll(" ", ""))
                        trigger(field.name)
                        trigger("repeat")
                      }}
                      data-error={!!error}
                      data-test={`input-change-password-${field.name}`}
                    />
                    <button type="button" onClick={() => onVisiblePassword(field.name)}>
                      <img src={visiblePass.password ? "/svg/eye.svg" : "/svg/eye-off.svg"} alt="eye" width={20} height={20} />
                    </button>
                  </div>
                  {error ? <i>{error.message}</i> : null}
                </fieldset>
              )
            }}
          />
          <Controller
            name="repeat"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test={`fieldset-change-password-${field.name}`}>
                <label htmlFor={field.name}>Повторите пароль</label>
                <div data-input>
                  <input
                    type={visiblePass.repeat ? "text" : "password"}
                    placeholder="Введите пароль ещё раз"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value.replaceAll(" ", ""))
                      trigger(field.name)
                    }}
                    data-error={!!error}
                    data-test={`input-change-password-${field.name}`}
                  />
                  <button type="button" onClick={() => onVisiblePassword(field.name)}>
                    <img src={visiblePass.repeat ? "/svg/eye.svg" : "/svg/eye-off.svg"} alt="eye" width={20} height={20} />
                  </button>
                </div>
                {error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
        </article>
        <Button
          type="submit"
          typeButton="fill-primary"
          label="Подтвердить"
          disabled={disabled}
          loading={loading}
          data-test="button-change-password-submit"
        />
      </form>
    </>
  )
}

ChangePassword.displayName = "ChangePassword"
export default ChangePassword
