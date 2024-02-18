"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchNumberConfirmation, useNumberConfirmation } from "@/store"
import { flushSync } from "react-dom"

export const NumberConfirmation = () => {
  const [loading, setLoading] = useState(false)
  const number = useNumberConfirmation(({ number }) => number)
  const visible = useNumberConfirmation(({ visible }) => visible)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>({ defaultValues: { code: "" } })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      flushSync(() => {
        setLoading(false)
      })
    }
  })

  function close() {
    dispatchNumberConfirmation(false, undefined)
  }

  return (
    <div className={cx("wrapper-fixed")} data-visible={visible}>
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
