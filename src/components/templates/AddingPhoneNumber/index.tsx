"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { postPhone } from "@/services/phones"
import { functionAuthErrors } from "@/services"
import { dispatchAddingPhoneNumber, dispatchNumberConfirmation, dispatchStartTimerNumberConfirmation, useAddingPhoneNumber } from "@/store"

import styles from "./style.module.scss"
import InputCountry from "@/components/common/Forward/InputCountry"

export const AddingPhoneNumber = () => {
  const [loading, setLoading] = useState(false)
  const visible = useAddingPhoneNumber(({ visible }) => visible)

  const {
    control,
    watch,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<{ phone: string }>({ defaultValues: { phone: "" } })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      const phone = values?.phone?.replaceAll(/[^\d]/g, "")

      postPhone({
        phone: phone!,
      }).then((response) => {
        if (response.ok) {
          dispatchStartTimerNumberConfirmation()
          dispatchNumberConfirmation(true, phone)
          close()
        } else {
          setError("phone", {
            message: functionAuthErrors(response?.error?.message) || response?.error?.message!,
          })
        }
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
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <fieldset>
                <label>Номер телефона</label>
                <InputCountry
                  {...field}
                  replaceValue={() => {
                    field.onChange("")
                  }}
                />
                {!!errors?.phone?.message ? <i>{errors?.phone?.message}</i> : null}
              </fieldset>
            )}
          />
          <Button type="submit" typeButton="fill-primary" label="Добавить" disabled={watch("phone")?.length < 9} loading={loading} />
        </form>
      </section>
    </div>
  )
}
