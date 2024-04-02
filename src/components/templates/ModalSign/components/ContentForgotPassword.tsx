"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import type { TContentForgotPassword } from "../types/types"
import { resolverForgotPassword, TSchemaForgotPassword } from "../utils/forgot-password.schema"

import { Button } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store"
import { useForgotPasswordHelper } from "@/helpers/auth/forgotPasswordHelper"

import styles from "../styles/form.module.scss"

export const ContentForgotPassword: TContentForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const email = useModalAuth(({ email }) => email)
  const { control, handleSubmit, setError } = useForm<TSchemaForgotPassword>({
    defaultValues: { email: email },
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
              type: "InformationEmailReset",
              email: values.email,
            })
          }
          if (response?.error?.code === 401) {
            setError("email", { message: "user is not verified" })
          }
          if (response?.error?.code === 404) {
            setError("email", { message: "user not found" })
          }
          if (response?.error?.code && response?.error?.code >= 500 && response?.error?.code <= 599) {
            setError("email", { message: "something went wrong" })
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
            <div data-label-input>
              <label htmlFor="email">Электронная почта</label>
              <input data-error={!!error} type="text" inputMode="email" placeholder="email_address@mail.com" {...field} />
              {error ? <i>{error.message}</i> : null}
            </div>
          )}
        />
        <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} />
      </form>
      <article data-column>
        <p>
          Уже есть аккаунт? <a onClick={() => dispatchAuthModal({ type: "SignIn" })}>Войти</a>
        </p>
      </article>
    </div>
  )
}
