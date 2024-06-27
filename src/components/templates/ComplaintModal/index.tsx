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
import { dispatchComplaintModalOffer, dispatchComplaintModalUser, dispatchModalClose, useAuth, useComplaintModal } from "@/store"

export default function ComplaintModal() {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const [loading, setLoading] = useState(false)

  const { onBarters } = useToast()
  const user = useComplaintModal(({ user }) => user)
  const offer = useComplaintModal(({ offer }) => offer)
  const { user: userOffer } = offer ?? {}
  const { username = "---" } = user ?? {}

  const { register, handleSubmit, watch, reset, setValue } = useForm<IValuesForm>({
    defaultValues: {},
  })

  function handleClose() {
    dispatchModalClose()
    dispatchComplaintModalUser({ user: undefined })
    dispatchComplaintModalOffer({ offer: undefined })
  }

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)

      const valuesData: IPostComplains = {
        receiverId: !!user ? user?.id! : userOffer?.id!,
        message: `${values.type === "other" ? values.text! : MENU_COMPLAINT.find((item) => item.value === values.type)?.label!} : ${
          !!user ? `user:${user?.username}` : `offer:${offer?.title}`
        }`,
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
          message: `Мы получили вашу жалобу и скоро страница пользователя будет проверена модераторами.`,
          status: EnumStatusBarter.INITIATED,
        })
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  return (
    <>
      <h2>{!!user ? "Пожаловаться на пользователя" : !!offer ? "Пожаловаться на публикацию" : null}</h2>
      <form onSubmit={onSubmit}>
        <div data-content>
          {!!user ? (
            <p>
              Данная жалоба на <span>@{username}</span> будет проверена модераторами, и если будут найдены нарушения, пользователь получит
              бан.
            </p>
          ) : !!offer ? (
            <p>Жалоба будет проверена модераторами, и если будут найдены нарушения, публикация будет заблокирована.</p>
          ) : null}

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
                  {...register("text", { required: watch("type") === "other", maxLength: 400 })}
                  maxLength={400}
                  placeholder="Опишите причину своими словами..."
                />
                <span data-more={watch("text")?.length > 380}>
                  <span>{watch("text")?.length || 0}</span>/400
                </span>
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
