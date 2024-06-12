"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import type { IValuesForm } from "./types/types"
import type { IPostComplains } from "@/services/complains/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import { Button } from "@/components/common"

import { serviceComplains } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { MENU_COMPLAINT } from "./constants/constants"
import { dispatchComplaintModalUser, dispatchModalClose, useAuth, useComplaintModal } from "@/store"

export default function ComplaintModal() {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const [loading, setLoading] = useState(false)

  const { onBarters } = useToast()
  const user = useComplaintModal(({ user }) => user)
  const { id, image, username = "---" } = user ?? {}

  const { register, handleSubmit, watch, reset, setValue } = useForm<IValuesForm>({
    defaultValues: {},
  })

  function handleClose() {
    dispatchModalClose()
    dispatchComplaintModalUser({ user: undefined })
  }

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)

      const valuesData: IPostComplains = {
        receiverId: user?.id!,
        message: values.type === "other" ? values.text! : MENU_COMPLAINT.find((item) => item.value === values.type)?.label!,
        enabled: true,
        provider: EnumTypeProvider.profile,
      }

      serviceComplains.post(valuesData).then((response) => {
        console.log("%c response: serviceComplains: ", "color: green", response)
        reset()
        handleClose()
        setLoading(false)
        onBarters({
          title: "Жалоба отправлена",
          message: `Мы получили вашу жалобу на @${username!} и скоро страница пользователя будет проверена модераторами.`,
          status: EnumStatusBarter.INITIATED,
        })
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  return (
    <>
      <h2>Пожаловаться на пользователя</h2>
      <form onSubmit={onSubmit}>
        <div data-content>
          <p>
            Данная жалоба на <span>@{username}</span> будет проверена модераторами, и если будут найдены нарушения, пользователь получит
            бан.
          </p>
          <ul {...register("type", { required: true })}>
            {MENU_COMPLAINT.map((item) => (
              <fieldset
                key={`::key::reason::menu::${item.value}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  setValue("type", item.value!)
                }}
              >
                <div data-check={watch("type") === item.value} />
                <label>{item.label}</label>
              </fieldset>
            ))}
            {watch("type") === "other" ? (
              <div data-text-area>
                <textarea
                  {...register("text", { required: watch("type") === "other", maxLength: 240 })}
                  maxLength={240}
                  placeholder="Опишите причину своими словами..."
                />
                <sup data-more={watch("text")?.length > 240}>
                  <span>{watch("text")?.length || 0}</span>/240
                </sup>
              </div>
            ) : null}
          </ul>
        </div>
        <div {...register("subject")} />
        <footer>
          <Button
            type="submit"
            typeButton="fill-primary"
            label="Отправить жалобу"
            loading={loading}
            disabled={!watch("type") || (watch("type") === "other" && !watch("text")) || !isAuth}
          />
        </footer>
      </form>
    </>
  )
}
