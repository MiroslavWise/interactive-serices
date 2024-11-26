"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { EnumSign } from "@/types/enum"
import type { TContentForgotPassword } from "../types/types"

import Button from "@/components/common/Button"

import { functionAuthErrors } from "@/services"
import { dispatchAuthModal, useModalAuth } from "@/store"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"
import { resolverForgotPassword, type TSchemaForgotPassword } from "../utils/forgot-password.schema"

import styles from "../styles/form.module.scss"

export const ContentForgotPassword: TContentForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const email = useModalAuth(({ email }) => email)
  const { control, handleSubmit, setError } = useForm<TSchemaForgotPassword>({
    defaultValues: { email: email || "" },
    resolver: resolverForgotPassword,
  })

  const onEnter = async (values: TSchemaForgotPassword) => {
    setLoading(true)
    if (values.email) {
      useForgotPasswordHelper
        .forgotPassword({ email: values.email })
        .then((response) => {
          if (response.ok && !!response?.res) {
            dispatchAuthModal({
              type: EnumSign.InformationEmailReset,
              email: values.email,
            })
          } else {
            setError("email", { message: functionAuthErrors(response?.error?.message) })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit(onEnter)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-test="forgot-password-email">
              <label htmlFor={field.name}>Электронная почта</label>
              <input
                {...field}
                type="text"
                inputMode="email"
                placeholder="email_address@mail.com"
                enterKeyHint="enter"
                data-error={!!error}
              />
              {error ? <i>{error.message}</i> : null}
            </div>
          )}
        />
        <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} />
      </form>
      <article data-column>
        <p>
          Уже есть аккаунт?&nbsp;
          <a onClick={() => dispatchAuthModal({ type: EnumSign.SignIn })} data-test="forgot-password-enter">
            Войти
          </a>
        </p>
      </article>
    </div>
  )
}
