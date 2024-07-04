"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"
import InputCountry from "@/components/common/Forward/InputCountry"

import { cx } from "@/lib/cx"
import { postPhone } from "@/services/phones"
import { functionAuthErrors } from "@/services"
import { dispatchAddingPhoneNumber, dispatchNumberConfirmation, dispatchStartTimerNumberConfirmation, useAddingPhoneNumber } from "@/store"

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
    <div
      className={cx(
        "wrapper-fixed",
        "bg-translucent md:pt-[5.625rem] md:px-5 md:pb-5 flex flex-col items-center max-md:p-0",
        visible && "!z-[2017] !opacity-100 !visible",
      )}
    >
      <section
        data-section-modal
        className="relative max-md:h-full md:rounded-[2rem] bg-BG-second w-full md:max-w-[30.625rem] flex-flex-col"
      >
        <ButtonClose onClick={close} />
        <header className="flex items-center justify-center md:pt-6 md:pb-5 max-md:p-5 max-md:pb-4">
          <h3 className="text-text-primary text-center text-2xl font-semibold">Номер телефона</h3>
        </header>
        <form onSubmit={onSubmit} className="max-md:px-5 py-10 md:px-[3.75rem] w-full flex flex-col gap-10">
          <p className="text-text-primary text-sm font-normal">Введите номер телефона, который хотите добавить</p>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <fieldset className="w-full flex flex-col gap-2">
                <label className="text-text-primary text-sm font-medium">Номер телефона</label>
                <InputCountry
                  {...field}
                  replaceValue={() => {
                    field.onChange("")
                  }}
                />
                {!!errors?.phone?.message ? <i className="font-medium not-italic text-xs text-left">{errors?.phone?.message}</i> : null}
              </fieldset>
            )}
          />
          <Button type="submit" typeButton="fill-primary" label="Добавить" disabled={watch("phone")?.length < 9} loading={loading} />
        </form>
      </section>
    </div>
  )
}
