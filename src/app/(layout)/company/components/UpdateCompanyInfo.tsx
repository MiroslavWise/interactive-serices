"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { ICompanyExtend } from "@/services/companies"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { updateCompany } from "../utils/update"
import { resolverSchemaCompany, TSchemaCompany } from "../utils/schema"
import { MAX_LENGTH_INN, MAX_LENGTH_OGRN } from "@/components/templates/AddAdverts/schema"

import styles from "../styles/form.module.scss"

interface IProps {
  company: ICompanyExtend
  refetch(): Promise<any>
}

function UpdateCompanyInfo({ company, refetch }: IProps) {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { title, ad, erid, inn, ogrn, owner } = company ?? {}
  const { getValues, control } = useForm<TSchemaCompany>({
    defaultValues: {
      title: title ?? "",
      ad: ad ?? "",
      erid: erid ?? "",
      inn: inn ?? "",
      ogrn: ogrn ?? "",
    },
    resolver: resolverSchemaCompany,
  })

  const isMain = userId === owner?.id

  return (
    <form className={cx("w-full flex flex-col gap-3 overflow-y-auto h-full py-5", styles.form)}>
      <h3 className="text-xl font-semibold text-text-primary">Данные о компании</h3>
      <p className="-mt-2 mb-3 text-text-secondary text-sm font-normal">
        Информация о вашей компании. В случае предоставления некорректных данных ваша компания будет удалена модерацией. Пожалуйста,
        проверяйте информацию на точность и актуальность.
      </p>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label className="text-sm text-text-primary font-medium" htmlFor={field.name} title="Название компании">
              Название компании
            </label>
            <input type="text" placeholder="Введите название" {...field} data-error={!!error} disabled />
          </fieldset>
        )}
      />
      <Controller
        name="inn"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label className="text-sm text-text-primary font-medium" htmlFor={field.name} title="ИНН компании">
              ИНН компании
            </label>
            <input type="text" placeholder="Введите ИНН" {...field} data-error={!!error} maxLength={MAX_LENGTH_INN} disabled />
          </fieldset>
        )}
      />
      <Controller
        name="ogrn"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label className="text-sm text-text-primary font-medium" htmlFor={field.name} title="ОГРН компании">
              ОГРН (Основной гос. регистрационный номер)
            </label>
            <input type="text" placeholder="Введите ОГРН" {...field} data-error={!!error} maxLength={MAX_LENGTH_OGRN} disabled />
          </fieldset>
        )}
      />
      <Controller
        name="erid"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label className="text-sm text-text-primary font-medium" htmlFor={field.name} title="ERID рекламной компании">
              ERID рекламной компании
            </label>
            <input type="text" placeholder="Введите ERID" {...field} data-error={!!error} disabled />
          </fieldset>
        )}
      />
      <Controller
        name="ad"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label className="text-sm text-text-primary font-medium" htmlFor={field.name} title="Описание">
              Описание (не обязательно)
            </label>
            <input type="text" placeholder="Введите описание" {...field} data-error={!!error} disabled />
          </fieldset>
        )}
      />
      {/* <Button
        type="button"
        label="Обновить"
        loading={loading}
        className="mt-3"
        disabled
        onClick={async () => {
          if (!loading && isMain) {
            setLoading(true)
            const values = getValues()
            const response = await updateCompany({ values, defaults: company! })
            if (response.ok !== "not update") {
              refetch()
            }
            setLoading(false)
          }
        }}
      /> */}
    </form>
  )
}

export default UpdateCompanyInfo
