/**
 * @description Модальное окно для добавления рекламы
 */
"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { patchAdvertPosts } from "@/services/posts"
import { useToast } from "@/helpers/hooks/useToast"
import { patchAdvertOffer } from "@/services/offers"
import { hideAddAdvert, useAddAdvert } from "@/store"
import { resolver, type TSchemaAdvert } from "./schema"

function AddAdverts() {
  const [loading, setLoading] = useState(false)
  const id = useAddAdvert(({ id }) => id)
  const type = useAddAdvert(({ type }) => type)
  const isOpen = type !== null && id !== null
  const { on } = useToast()

  const { control, handleSubmit } = useForm<TSchemaAdvert>({
    defaultValues: {
      title: "",
      ad: "",
      erid: "",
      inn: "",
      ogrn: "",
    },
    resolver: resolver,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const body: TSchemaAdvert = {}

      const title = values.title?.trim()
      const inn = values.inn?.trim()
      const erid = values.erid?.trim()
      const ad = values.ad?.trim()
      const ogrn = values.ogrn?.trim()

      if (title) body.title = title
      if (inn) body.inn = inn
      if (erid) body.erid = erid
      if (ad) body.ad = ad
      if (ogrn) body.ogrn = ogrn

      if (Object.keys(body).length > 0) {
        if (type && [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type)) {
          const response = await patchAdvertOffer(id!, body)

          if (response.ok) {
            on({
              message: "Реклама добавлена",
            })
          }
        }
        if (type && EnumTypeProvider.POST) {
          const response = await patchAdvertPosts(id!, body)

          if (response.ok) {
            on({
              message: "Реклама добавлена",
            })
          }
        }
      }

      setLoading(false)
      hideAddAdvert()
    }
  })

  return (
    <div
      className={cx(
        "fixed inset-0 bg-translucent w-full h-full z-[2000] max-md:h-dvh",
        isOpen ? "flex flex-col items-center justify-end md:justify-center" : "hidden",
      )}
    >
      <form
        onSubmit={onSubmit}
        className="w-full bg-BG-second rounded-t-3xl md:rounded-2 p-5 md:p-10 pt-9 md:pt-5 relative md:max-w-[33.75rem] flex flex-col gap-[1.875rem]"
      >
        <h3 className="text-text-primary text-2xl font-medium">Добавление рекламы</h3>
        <section className="flex flex-col gap-3 md:gap-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label htmlFor={field.name} title="Название компании">
                  Название компании
                </label>
                <input type="text" placeholder="Введите название" {...field} />
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="inn"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label htmlFor={field.name} title="ИНН компании">
                  ИНН компании
                </label>
                <input type="text" placeholder="Введите ИНН" {...field} />
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="ogrn"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label htmlFor={field.name} title="ОГРН компании">
                  ОГРН (Основной гос. регистрационный номер)
                </label>
                <input type="text" placeholder="Введите ОГРН" {...field} />
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="erid"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label htmlFor={field.name} title="ERID рекламной компании">
                  ERID рекламной компании
                </label>
                <input type="text" placeholder="Введите ERID" {...field} />
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="ad"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label htmlFor={field.name} title="Описание рекламы">
                  Описание рекламы (не обязательно)
                </label>
                <input type="text" placeholder="Введите описание" {...field} />
              </fieldset>
            )}
          />
        </section>
        <footer className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 items-center">
          <Button type="button" typeButton="regular-primary" label="Отмена" onClick={hideAddAdvert} loading={loading} disabled={loading} />
          <Button type="submit" typeButton="fill-primary" label="Добавить" disabled={loading} loading={loading} />
        </footer>
      </form>
    </div>
  )
}

AddAdverts.displayName = "AddAdverts"
export default AddAdverts
