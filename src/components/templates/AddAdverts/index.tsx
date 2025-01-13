/**
 * @description Модальное окно для добавления рекламы
 */
"use client"

import { HTMLInputTypeAttribute, useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { EAdvertsButton, EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"
import IconPlus from "@/components/icons/IconPlus"
import { ImageStatic } from "@/components/common/Image"
import ControllerAddAction from "./ControllerAddAction"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { cx } from "@/lib/cx"
import { fileUploadService } from "@/services"
import { useOutsideClickEvent } from "@/helpers"
import { patchAdvertPosts } from "@/services/posts"
import { useToast } from "@/helpers/hooks/useToast"
import { hideAddAdvert, useAddAdvert, useAuth } from "@/store"
import { IBodyAdvert, patchAdvertOffer } from "@/services/offers"
import { resolver, type TSchemaAdvert, TFiles, handleImageChange } from "./schema"

import styles from "./style.module.scss"

function AddAdverts() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
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
      file: {
        file: [],
        string: [],
      },
      actionUrl: "",
    },
    resolver: resolver,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const body: IBodyAdvert = {}

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

      const actionAdvertButton = values.actionAdvertButton
      const actionUrl = values.actionUrl.trim()

      if (!!actionAdvertButton) {
        let url = actionUrl ?? ""

        if (actionAdvertButton === EAdvertsButton.BECOME_A_MEMBER) {
          url = ""
        }

        body.actions = [
          {
            action: actionAdvertButton,
            url: url,
            enabled: true,
          },
        ]
      }

      const files = values.file.file
      const ids: number[] = []

      if (files.length > 0) {
        const responseImages = await Promise.all(
          files.map((item) =>
            fileUploadService(item!, {
              type: type!,
              userId: userId!,
              idSupplements: id!,
            }),
          ),
        )

        responseImages.forEach((item) => {
          if (!!item.data) {
            ids.push(item.data.id)
          }
        })
      }

      if (ids.length > 0) body.imageId = ids[0]!

      if (Object.keys(body).length > 0) {
        if (type && [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type)) {
          const response = await patchAdvertOffer(id!, body)

          if (response.ok) {
            on({
              message: "Реклама добавлена",
            })
          }
        }
        if (type && EnumTypeProvider.POST === type) {
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
        isOpen ? "flex flex-col items-center justify-end md:justify-center md:py-5" : "hidden",
      )}
    >
      <form
        onSubmit={onSubmit}
        className="w-full bg-BG-second md:rounded-2 p-5 md:p-10 pt-9 md:pt-5 relative md:max-w-[33.75rem] flex flex-col gap-[1.875rem] h-full overflow-hidden overflow-y-auto"
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
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <fieldset className="w-full flex flex-col gap-2.5">
                <label htmlFor={field.name} className="text-text-primary text-sm font-semibold">
                  Добавьте логотип компании
                </label>
                <div className={cx("flex -mx-6 overflow-hidden", styles.images)}>
                  <div className={cx("px-6 flex flex-row gap-4 flex-nowrap overflow-hidden overflow-x-scroll w-full")}>
                    <label
                      className={cx(
                        "relative border border-dashed border-grey-stroke bg-BG-second rounded-2xl z-10 hover:border-element-accent-1 transition-all duration-200",
                        "[&>svg>path]:fill-element-accent-1 [&>svg]:w-6 [&>svg]:h-6",
                        field.value.file.length > 0 ? "hidden" : "flex w-full h-[3.75rem] aspect-auto",
                        //"h-[10.5rem] w-32 aspect-[16/21]"
                      )}
                    >
                      <input
                        type="file"
                        className="w-full h-full absolute inset-0 opacity-0 z-20"
                        accept="image/*"
                        onChange={async (event) => {
                          const dataValues = await handleImageChange(field.value, event)
                          field.onChange(dataValues)
                          event.target.value = ""
                        }}
                      />
                      <IconPlus />
                    </label>
                    {field.value.string.map((item, index) => (
                      <div key={`:key:img:${index}:`} className="h-[10.5rem] w-32 aspect-[16/21] rounded-2xl overflow-hidden relative flex">
                        <ImageStatic src={item} alt={`${index}-img`} width={128} height={168} className="h-[10.5rem] w-32 aspect-[16/21]" />
                        <button
                          type="button"
                          className="absolute z-10 top-1.5 bg-BG-second right-1.5 w-8 h-8 rounded-full *:w-4 *:h-4 [&>svg>path]:fill-text-primary flex items-center justify-center p-2"
                          onClick={() => {
                            const newImages: TFiles = {
                              file: field.value.file.filter((_, i) => i !== index),
                              string: field.value.string.filter((_, i) => i !== index),
                            }

                            field.onChange(newImages)
                          }}
                        >
                          <IconTrashBlack />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>
            )}
          />
          <ControllerAddAction control={control} />
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
