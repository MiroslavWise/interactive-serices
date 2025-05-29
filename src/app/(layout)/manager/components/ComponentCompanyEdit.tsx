"use client"

import { Dispatch, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import Button from "@/components/common/Button"

import { clg } from "@console"
import { ICompanyExtend } from "@/services/companies"
import { updateCompany } from "../../company/utils/update"
import { MAX_LENGTH_INN, MAX_LENGTH_OGRN, TSchemaAdvert, resolver } from "@/components/templates/AddAdverts/schema"

interface IProps {
  company: ICompanyExtend
  setIsEdit: Dispatch<boolean>
  refetch: () => Promise<any>
}

function ComponentCompanyEdit({ company, setIsEdit, refetch }: IProps) {
  const [loading, setLoading] = useState(false)

  const { title = "", ad = "", erid = "", inn = "", ogrn = "" } = company ?? {}

  const { control, getValues } = useForm<TSchemaAdvert>({
    defaultValues: {
      title: title,
      ad: ad,
      erid: erid,
      inn: inn,
      ogrn: ogrn,
    },
    resolver: resolver,
  })

  // const onSubmit =

  return (
    <div className="w-full h-full py-5">
      <form className="w-full h-full rounded-2 bg-BG-first border border-grey-field overflow-hidden overflow-y-hidden flex flex-col gap-3 pt-5 px-5">
        <h3 className="text-text-primary text-2xl font-medium">Обновление данных о компании</h3>
        <section className="flex flex-col gap-3 md:gap-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <fieldset className="flex flex-col gap-2 items-start">
                <label className="text-sm text-text-primary" htmlFor={field.name} title="Название компании">
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
                <label className="text-sm text-text-primary" htmlFor={field.name} title="ИНН компании">
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
                <label className="text-sm text-text-primary" htmlFor={field.name} title="ОГРН компании">
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
                <label className="text-sm text-text-primary" htmlFor={field.name} title="ERID рекламной компании">
                  ERID рекламной компании (если компания участвует в ней)
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
                <label htmlFor={field.name} title="Описание компании">
                  Описание компании (не обязательно)
                </label>
                <input type="text" placeholder="Введите описание" {...field} />
              </fieldset>
            )}
          />
        </section>
        <footer className="mt-auto p-5 flex flex-col gap-2 border-t border-grey-stroke-light">
          <div className="w-full flex flex-col md:flex-row items-center justify-start gap-2">
            <Button
              type="button"
              label="Обновить"
              typeButton="fill-primary"
              className="md:max-w-[15.625rem]"
              onClick={async () => {
                const values = getValues()
                if (!loading) {
                  setLoading(true)
                  const response = await updateCompany({ defaults: company, values: values })
                  if (response.ok !== "not update") {
                    refetch()
                  }
                  setIsEdit(false)
                  setLoading(false)
                }
              }}
              loading={loading}
              disabled={loading}
            />
            <Button
              type="button"
              label="Отмена"
              typeButton="regular-primary"
              className="md:max-w-[15.625rem]"
              onClick={() => setIsEdit(false)}
              loading={loading}
              disabled={loading}
            />
          </div>
        </footer>
      </form>
    </div>
  )
}

ComponentCompanyEdit.displayName = "ComponentCompanyEdit"
export default ComponentCompanyEdit
