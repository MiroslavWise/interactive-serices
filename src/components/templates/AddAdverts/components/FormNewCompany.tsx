import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import Button from "@/components/common/Button"
import { ImageStatic } from "@/components/common"
import IconPlus from "@/components/icons/IconPlus"
import ControllerAddAction from "./ControllerAddAction"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { IBodyAdvertAction } from "@/services/offers"
import { EAdvertsButton, EnumTypeProvider } from "@/types/enum"
import { IBodyAdvert, patchAdvertOffer } from "@/services/offers"

import { cx } from "@/lib/cx"
import { fileUploadService } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { patchAdvertPosts } from "@/services/posts"
import { hideAddAdvert, useAddAdvert, useAuth } from "@/store"
import { MAX_LENGTH_OGRN, MAX_LENGTH_INN, TSchemaAdvert, resolver, handleImageChange, TFiles } from "../schema"

import styles from "../styles/style.module.scss"
import { IBodyCompany, patchCompany, postCompany } from "@/services/companies"

function FormNewCompany() {
  const [loading, setLoading] = useState(false)

  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const id = useAddAdvert(({ id }) => id)
  const type = useAddAdvert(({ type }) => type)
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
      const title = values.title?.trim() ?? ""
      const inn = values.inn?.trim() ?? ""
      const erid = values.erid?.trim() ?? ""
      const body: IBodyCompany = {
        title: title,
        inn: inn,
        erid: erid,
      }
      const bodyAction: IBodyAdvertAction = {}

      const ad = values.ad?.trim()
      const ogrn = values.ogrn?.trim()

      if (!!ad) body.ad = ad
      if (!!ogrn) body.ogrn = ogrn

      const actionAdvertButton = values.actionAdvertButton
      const actionUrl = values.actionUrl.trim()

      if (!!actionAdvertButton) {
        let url = actionUrl ?? ""

        if (actionAdvertButton === EAdvertsButton.BECOME_A_MEMBER) {
          url = ""
        }

        bodyAction.actions = [
          {
            action: actionAdvertButton,
            url: url,
            enabled: true,
          },
        ]
      }

      if (Object.keys(bodyAction).length > 0) {
        body.actions = bodyAction.actions
      }

      const responsePost = await postCompany(body)

      if (responsePost.ok) {
        const companyId = responsePost?.res?.id!

        const files = values.file.file
        const ids: number[] = []

        if (files.length > 0) {
          const responseImages = await Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: type!,
                userId: userId!,
                idSupplements: companyId!,
              }),
            ),
          )

          responseImages.forEach((item) => {
            if (!!item.data) {
              ids.push(item.data.id)
            }
          })
        }

        await Promise.all([
          ids.length > 0 ? patchCompany({ imageId: ids[0]! }, companyId) : Promise.resolve(),
          type === EnumTypeProvider.POST ? patchAdvertPosts(id!, companyId) : patchAdvertOffer(id!, companyId),
        ])

        on({
          message: "Реклама добавлена",
        })
      }

      setLoading(false)
      hideAddAdvert()
    }
  })

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-[1.875rem]">
      <h3 className="text-text-primary text-2xl font-medium">Добавление новой рекламной компании</h3>
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
              <input type="text" placeholder="Введите ИНН" {...field} maxLength={MAX_LENGTH_INN} />
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
              <input type="text" placeholder="Введите ОГРН" {...field} maxLength={MAX_LENGTH_OGRN} />
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
        <Button type="submit" typeButton="fill-primary" label="Создать и добавить" disabled={loading} loading={loading} />
      </footer>
    </form>
  )
}

FormNewCompany.displayName = "FormNewCompany"
export default FormNewCompany
