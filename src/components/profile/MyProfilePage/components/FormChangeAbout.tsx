"use client"

import { Controller, useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { resolverAbout, TValidateSchemaAbout } from "../utils/about.schema"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useOut } from "@/helpers"
import { getProfile, getUserId, patchProfile } from "@/services"

export const FormChangeAbout = ({ setIsEditing }: { setIsEditing: Dispatch<SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false)
  const { out } = useOut()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })
  const { data: dataUser } = data ?? {}
  const { profile } = dataUser ?? {}

  const { watch, handleSubmit, control, trigger } = useForm<TValidateSchemaAbout>({
    defaultValues: {
      text: profile?.about || "",
    },
    resolver: resolverAbout,
  })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      const newText = values?.text?.trim()
      const oldText = profile?.about || ""

      if (newText !== oldText && !!newText) {
        patchProfile({ about: values.text! })
          .then((response) => {
            if (response.error?.code === 401) {
              out()
              return
            }
            refetch()
          })
          .finally(() => {
            setLoading(false)
            setIsEditing(false)
          })
      } else {
        setLoading(false)
        setIsEditing(false)
      }
    }
  })

  const disabled = watch("text") === profile?.about || !watch("text")?.trim()
  const handleCancel = () => setIsEditing(false)

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 relative">
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              {...field}
              onChange={(event) => {
                field.onChange(event)
                trigger(field.name)
              }}
              className={cx(
                "w-full text-sm font-normal border-none outline-none min-h-5 p-0 bg-transparent resize-none max-h-[3.75rem]",
                !!error ? "text-text-error" : "text-text-primary",
              )}
            />
            {
              <i className={cx("absolute bottom-0 right-0 text-right text-xs", !!error ? "text-text-error" : "text-text-primary")}>
                {!!error ? error.message : null} {field.value.length}/512
              </i>
            }
          </>
        )}
      />
      <footer className="flex flex-row items-end justify-between">
        <div data-buttons className="flex flex-row gap-2.5 *:px-4 *:max-w-fit *:h-9 [&>button>span]:text-sm">
          <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={disabled} loading={loading} />
          <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleCancel} loading={loading} />
        </div>
      </footer>
    </form>
  )
}
