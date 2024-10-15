"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { EnumSign } from "@/types/enum"

import { resolverCodeVerification, type TSchemaCodeVerification } from "../utils/code-verification.schema"

import { TimerData } from "./TimerData"
import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceAuth } from "@/services"
import { useReplacePathName } from "../hooks/replace-path-name"
import { dispatchAuthModal, dispatchAuthToken, dispatchCloseModalAuth, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentCodeVerification = ({}) => {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone = "" }) => phone)
  const prevType = useModalAuth(({ prevType }) => prevType)
  const idUser = useModalAuth(({ idUser }) => idUser)
  const { onReplace } = useReplacePathName()

  const { control, handleSubmit, setError } = useForm<TSchemaCodeVerification>({
    resolver: resolverCodeVerification,
  })

  function handleChange() {
    dispatchAuthModal({
      visible: true,
      type: prevType || EnumSign.SignUp,
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
        .then(async (response) => {
          if (response.ok) {
            dispatchAuthToken({
              auth: response?.res!,
              user: null,
            })
            dispatchCloseModalAuth()
            onReplace()
          } else {
            console.log("%c ---ERROR CONFIRM CODE---", "color: #f00", response?.error)
            setError("code", { message: "Не верный код" })
            setLoading(false)
          }
        })
    }
  }

  return (
    <div className={cx(styles.content, "flex flex-col items-center gap-[1.875rem] md:max-w-[23.125rem] w-full max-md:px-5")}>
      <article data-column>
        <p>Отправили проверочный код на номер</p>
        <b>
          {phone[0] !== "8" ? "+" : ""}
          {phone}
        </b>
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
            }}
            render={({ field, fieldState: { error } }) => (
              <div data-label-input data-test="code-verification">
                <label htmlFor={field.name}>Код из СМС</label>
                <input
                  {...field}
                  data-error={!!error}
                  placeholder="Введите код из СМС-сообщения"
                  maxLength={6}
                  type="text"
                  inputMode="numeric"
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").replaceAll(/\s{1,}/g, ""))}
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
