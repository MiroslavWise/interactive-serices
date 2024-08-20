"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { type IValuesForm } from "./types/types"
import { type IPostComplains } from "@/services/complains/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { postComplain } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { MENU_COMPLAINT } from "./constants/constants"
import { dispatchCleanComplaintModal, dispatchModalClose, useAuth, useComplaintModal } from "@/store"

export default function ComplaintModal() {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const [loading, setLoading] = useState(false)

  const { onBarters } = useToast()
  const user = useComplaintModal(({ user }) => user)
  const offer = useComplaintModal(({ offer }) => offer)
  const { username = "---" } = user ?? {}

  console.log("useComplaintModal: user", user)
  console.log("useComplaintModal: offer", offer)

  const { register, handleSubmit, watch, reset, setValue } = useForm<IValuesForm>({
    defaultValues: {},
  })

  function handleClose() {
    dispatchCleanComplaintModal()
    dispatchModalClose()
  }

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)

      const valuesData: IPostComplains = {
        receiverId: !!user ? user?.id! : offer?.id!,
        message: `${values.type === "other" ? values.text! : MENU_COMPLAINT.find((item) => item.value === values.type)?.label!}`,
        enabled: true,
        provider: !!offer ? offer.provider : EnumTypeProvider.profile,
      }

      postComplain(valuesData).then((response) => {
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

  useEffect(() => {
    return () => {
      dispatchCleanComplaintModal()
    }
  }, [])

  return (
    <>
      <h2 className="w-full text-text-primary text-2xl font-semibold">
        {!!offer ? "Пожаловаться на публикацию" : !!user ? "Пожаловаться на пользователя" : null}
      </h2>
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col gap-[1.875rem] max-md:overflow-y-auto max-md:pb-5">
        <div data-content className="w-full flex flex-col gap-6">
          <p className="text-text-secondary text-sm font-normal [&>span]:text-text-accent">
            {!!user
              ? `Данная жалоба на @${username} будет проверена модераторами, и если будут найдены нарушения, пользователь получит бан.`
              : !!offer
              ? `Жалоба будет проверена модераторами, и если будут найдены нарушения, публикация будет заблокирована.`
              : null}
          </p>
          <ul {...register("type", { required: true })} className="w-full flex flex-col gap-2.5">
            {MENU_COMPLAINT.map((item) => (
              <fieldset
                key={`::key::reason::menu::${item.value}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  setValue("type", item.value!)
                }}
                className="w-full flex flex-start gap-3 cursor-pointer items-center"
              >
                <div
                  data-check={watch("type") === item.value}
                  className={cx(
                    "w-4 h-4 aspect-square rounded-full border border-solid border-element-accent-1 p-2",
                    watch("type") === item.value ? "bg-element-accent-1" : "bg-transparent",
                  )}
                />
                <label className="text-text-primary text-base font-normal">{item.label}</label>
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
        <footer className="w-full">
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
