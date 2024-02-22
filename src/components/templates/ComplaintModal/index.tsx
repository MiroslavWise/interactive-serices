"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"

import type { IValuesForm } from "./types/types"
import type { IPostComplains } from "@/services/complains/types"

import { ButtonClose, Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceComplains } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { MENU_COMPLAINT } from "./constants/constants"
import { dispatchComplaintModal, useAuth, useComplaintModal } from "@/store"

import styles from "./styles/style.module.scss"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

export const ComplaintModal = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const [loading, setLoading] = useState(false)

  const { onBarters } = useToast()
  const user = useComplaintModal(({ user }) => user)
  const visibleComplaint = useComplaintModal(({ visibleComplaint }) => visibleComplaint)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<IValuesForm>({
    defaultValues: {},
  })

  function handleClose() {
    dispatchComplaintModal({ visible: false, user: undefined })
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
        flushSync(() => {
          reset()
          handleClose()
          setLoading(false)
          onBarters({
            title: "Жалоба отправлена",
            message: `Мы получили вашу жалобу на @${user?.profile?.username!} и скоро страница пользователя будет проверена модераторами.`,
            status: EnumStatusBarter.INITIATED,
          })
        })
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleComplaint}>
      <section data-section-modal>
        <ButtonClose onClick={handleClose} position={{}} />
        <h2>Пожаловаться на пользователя</h2>
        <form onSubmit={onSubmit}>
          <div data-content>
            <p>
              Данная жалоба на <span>@{user?.profile?.username!}</span> будет проверена модераторами, и если будут найдены нарушения,
              пользователь получит бан.
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
                  <sup data-more={watch("text")?.length > 920}>
                    <span>{watch("text")?.length || 0}</span>/1024
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
      </section>
    </div>
  )
}
