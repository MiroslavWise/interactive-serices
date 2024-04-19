"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { resolverCodeVerification, TSchemaCodeVerification } from "../utils/code-verification.schema"

import { TimerData } from "./TimerData"
import { Button } from "@/components/common"

import { serviceAuth } from "@/services"
import { dispatchAuthModal, useAuth, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentCodeVerification = ({}) => {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)
  const prevType = useModalAuth(({ prevType }) => prevType)
  const idUser = useModalAuth(({ idUser }) => idUser)
  const setToken = useAuth(({ setToken }) => setToken)

  const { control, handleSubmit, setError } = useForm<TSchemaCodeVerification>({
    resolver: resolverCodeVerification,
  })

  function handleChange() {
    dispatchAuthModal({
      visible: true,
      type: prevType || "SignUp",
    })
  }

  function handleConfirmation(values: TSchemaCodeVerification) {
    if (!loading) {
      setLoading(true)
      serviceAuth
        .sms({
          code: values.code!,
          id: idUser!,
        })
        .then((response) => {
          if (response.ok) {
            if (response?.res) {
              dispatchAuthModal({
                visible: false,
                type: null,
              })
              setToken({
                ok: true,
                token: response?.res?.accessToken!,
                refreshToken: response?.res?.refreshToken!,
                expires: response?.res?.expires!,
                userId: response?.res?.id!,
                email: "",
              })
            }
          } else {
            console.log("%c ---ERROR CONFIRM CODE---", "color: #f00", response?.error)
            setError("code", { message: "Не верный код" })
            setLoading(false)
          }
        })
    }
  }

  return (
    <div className={styles.content}>
      <article data-column>
        <p>Отправили проверочный код на номер</p>
        <b>{phone}</b>
      </article>
      <form onSubmit={handleSubmit(handleConfirmation)}>
        <section className={styles.section}>
          <Controller
            name="code"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Введите 6 символов",
              },
              minLength: 6,
              maxLength: 6,
            }}
            render={({ field, fieldState: { error } }) => (
              <div data-label-input data-test="code-verification">
                <label htmlFor={field.name}>Код из СМС</label>
                <input
                  data-error={!!error}
                  placeholder="Введите код из СМС-сообщения"
                  maxLength={6}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  {...field}
                />
                {!!error ? <i>{error?.message}</i> : null}
              </div>
            )}
          />
          <TimerData />
        </section>
        <footer data-buttons>
          <Button
            type="button"
            typeButton="regular-primary"
            label="Изменить номер"
            onClick={handleChange}
            loading={loading}
            disabled={loading}
            data-test="code-verification-submit"
          />
          <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} disabled={loading} />
        </footer>
      </form>
    </div>
  )
}
