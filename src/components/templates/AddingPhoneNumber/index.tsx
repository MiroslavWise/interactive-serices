"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchAddingPhoneNumber, useAddingPhoneNumber } from "@/store"

import styles from "./style.module.scss"

export const AddingPhoneNumber = () => {
  const [loading, setLoading] = useState(false)
  const visible = useAddingPhoneNumber(({ visible }) => visible)

  const {
    register,
    watch,
    setError,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<{ phone: string }>({ defaultValues: { phone: "" } })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      flushSync(() => {
        setLoading(false)
      })
    }
  })

  function close() {
    dispatchAddingPhoneNumber(false)
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Номер телефона</h3>
        </header>
        <form onSubmit={onSubmit}>
          <p>Введите номер телефона, который хотите добавить</p>
          <fieldset>
            <label>Номер телефона</label>
            <div
              data-phone-div
              data-error={!!errors?.phone?.message}
              onClick={(event) => {
                event.stopPropagation()
                setFocus("phone")
              }}
            >
              {!!watch("phone") && `${watch("phone")}`[0] !== "8" ? <span>+</span> : null}
              <input
                data-input-phone
                placeholder="+7 999 000-00-00"
                type="tel"
                inputMode="numeric"
                {...register("phone", { required: true, minLength: 11, maxLength: 16 })}
                maxLength={16}
              />
            </div>
            {!!errors?.phone?.message ? <i></i> : null}
          </fieldset>
          <Button type="submit" typeButton="fill-primary" label="Добавить" disabled={watch("phone")?.length > 9} loading={loading} />
        </form>
      </section>
    </div>
  )
}
