"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { postVerifyPhone } from "@/services/phones"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchNumberConfirmation, useNumberConfirmation } from "@/store"

import styles from "./style.module.scss"

export const NumberConfirmation = () => {
  const [loading, setLoading] = useState(false)
  const number = useNumberConfirmation(({ number }) => number)
  const visible = useNumberConfirmation(({ visible }) => visible)
  const { on } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>({ defaultValues: { code: "" } })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      postVerifyPhone({
        phone: number!,
        code: values.code,
      }).then((response) => {
        if (response.ok) {
          on({ message: "Номер телефона успешно добавлен" })
          flushSync(() => {
            close()
          })
        } else {
          setError("code", { message: response?.error?.message })
        }
        flushSync(() => {
          setLoading(false)
        })
      })
    }
  })

  function close() {
    dispatchNumberConfirmation(false, undefined)
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Подтверждение номера</h3>
        </header>
        <form onSubmit={onSubmit}>
          <p>
            Отправили проверочный код на номер
            <span>{number}</span>
          </p>
          <article>
            <fieldset>
              <label>Код из СМС</label>
              <input
                type="number"
                inputMode="numeric"
                {...register("code", { required: true, minLength: 4, maxLength: 12 })}
                maxLength={12}
                minLength={4}
                data-error={!!errors.code}
              />
              {!!errors?.code?.message ? <i>{errors?.code?.message}</i> : null}
            </fieldset>
            <p>
              Запросить новый код можно через
              <span>2:00</span>
            </p>
          </article>
          <footer>
            <Button type="button" typeButton="regular-primary" label="Изменить номер" loading={loading} />
            <Button type="submit" typeButton="fill-primary" label="Продолжить" loading={loading} />
          </footer>
        </form>
      </section>
    </div>
  )
}
