"use client"

import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/common"

import { useAuth } from "@/store"
import { useOut } from "@/helpers"
import { getProfileUserId, patchProfile } from "@/services"

export const FormChangeAbout = ({ setIsEditing }: { setIsEditing: Dispatch<SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false)
  const { out } = useOut()
  const userId = useAuth(({ userId }) => userId)

  const { data: dataProfile, refetch } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const { res } = dataProfile ?? {}

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>({
    defaultValues: {
      text: res?.about || "",
    },
  })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)
      patchProfile({ about: values.text! }, res?.id!)
        .then((response) => {
          if (response.error?.code === 401) {
            out()
            return
          }
          refetch()
        })
        .finally(() => {
          setIsEditing(false)
        })
    }
  })

  const disabled = watch("text") === res?.about || !watch("text")?.trim()
  function handleCancel() {
    setIsEditing(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea {...register("text", { required: true })} data-error={!!errors?.text} />
      <footer>
        <div data-buttons>
          <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={disabled} loading={loading} />
          <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleCancel} loading={loading} />
        </div>
        <sup>{watch("text")?.length || 0}/512</sup>
      </footer>
    </form>
  )
}
