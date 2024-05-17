"use client"

import { Controller, useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/common"

import { useAuth } from "@/store"
import { useOut } from "@/helpers"
import { resolverAbout, TValidateSchemaAbout } from "../utils/about.schema"
import { getProfile, patchProfile } from "@/services"

export const FormChangeAbout = ({ setIsEditing }: { setIsEditing: Dispatch<SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false)
  const { out } = useOut()
  const userId = useAuth(({ userId }) => userId)

  const { data, refetch } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const { res } = data ?? {}

  const { watch, handleSubmit, control, trigger } = useForm<TValidateSchemaAbout>({
    defaultValues: {
      text: res?.about || "",
    },
    resolver: resolverAbout,
  })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      const newText = values?.text?.trim()
      const oldText = res?.about || ""

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

  const disabled = watch("text") === res?.about || !watch("text")?.trim()
  function handleCancel() {
    setIsEditing(false)
  }

  return (
    <form onSubmit={onSubmit}>
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
              data-error={!!error}
            />
            {
              <i data-error={!!error}>
                {!!error ? error.message : null} {field.value.length}/512
              </i>
            }
          </>
        )}
      />
      <footer>
        <div data-buttons>
          <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={disabled} loading={loading} />
          <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleCancel} loading={loading} />
        </div>
      </footer>
    </form>
  )
}
