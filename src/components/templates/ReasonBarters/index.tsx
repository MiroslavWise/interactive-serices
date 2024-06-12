"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { ETypeReason } from "@/services/barters/types"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { MAX_LENGTH_TEXT_OTHER, resolverReasonBarters, TReasonBarters } from "./utils/schema"
import { useToast } from "@/helpers/hooks/useToast"
import { MENU_REASON } from "./constants/constants"
import { dispatchReasonBarters, useAuth, useReasonBarters } from "@/store"
import { getBarterId, patchBarter, serviceNotifications } from "@/services"

import styles from "./styles/style.module.scss"

export const ReasonBarters = () => {
  const [loading, setLoading] = useState(false)
  const { onBarters } = useToast()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const visible = useReasonBarters(({ visible }) => visible)
  const barterId = useReasonBarters(({ barterId }) => barterId)
  const { setValue, register, handleSubmit, watch, control } = useForm<TReasonBarters>({
    defaultValues: {
      type: ETypeReason["found-specialist"],
      text: "",
    },
    resolver: resolverReasonBarters,
  })

  const { refetch } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: false,
  })

  const { refetch: refetchBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId }],
    enabled: false,
  })

  const onSubmit = handleSubmit(({ type, text }) => {
    if (!loading) {
      setLoading(true)
      let textReason = text

      if (type !== ETypeReason.other) {
        textReason = MENU_REASON.find((item) => item?.value === type)?.label!
      }

      Promise.all([patchBarter({ enabled: true, status: EnumStatusBarter.DESTROYED, title: textReason }, barterId!)]).then(() => {
        refetch()
        refetchBarter()
        onBarters({
          title: "Спасибо за обратную связь",
          message: "Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей.",
          status: EnumStatusBarter.INITIATED,
        })
        handleClose()
        setLoading(false)
      })
    }
  })

  function handleClose() {
    dispatchReasonBarters({ visible: false, notificationId: undefined, barterId: undefined })
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose position={{}} onClick={handleClose} />
        <h2>Пожалуйста, укажите причину несостоявшегося обмена</h2>
        <form onSubmit={onSubmit}>
          <div data-content>
            <p>Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей</p>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <ul {...field}>
                  {MENU_REASON.map((item) => (
                    <fieldset
                      key={`::key::reason::menu::${item.value}::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        field.onChange(item.value as ETypeReason)
                      }}
                    >
                      <div data-check={field.value === item.value} />
                      <label>{item.label}</label>
                    </fieldset>
                  ))}
                  {field.value === ETypeReason.other ? (
                    <Controller
                      name="text"
                      control={control}
                      render={({ field, fieldState }) => (
                        <div data-text-area>
                          <textarea
                            {...register("text", { required: watch("type") === ETypeReason.other, maxLength: MAX_LENGTH_TEXT_OTHER })}
                            maxLength={MAX_LENGTH_TEXT_OTHER}
                            onChange={(event) => field.onChange(event.target.value.replace(/\s{2,}/g, " "))}
                            placeholder="Опишите причину своими словами..."
                            data-error={!!fieldState.error}
                          />
                          <sup data-more={field.value.length > MAX_LENGTH_TEXT_OTHER - 30} data-error={!!fieldState.error}>
                            {fieldState.error?.message ? fieldState.error.message : null}&nbsp;
                            <span>{field.value.length || 0}</span>/{MAX_LENGTH_TEXT_OTHER}
                          </sup>
                        </div>
                      )}
                    />
                  ) : null}
                </ul>
              )}
            />
          </div>
          <footer>
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Отправить"
              loading={loading}
              disabled={!watch("type") || (watch("type") === "other" && !watch("text"))}
            />
          </footer>
        </form>
      </section>
    </div>
  )
}

interface IValuesForm {
  type: ETypeReason
  text: string
}
