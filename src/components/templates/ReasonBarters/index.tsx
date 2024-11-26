"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumStatusBarter } from "@/types/enum"
import { ETypeReason } from "@/services/barters/types"

import Button from "@/components/common/Button"
import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { MENU_REASON } from "./constants/constants"
import { dispatchReasonBarters, useAuth, useReasonBarters } from "@/store"
import { getBarterId, patchBarter, serviceNotifications } from "@/services"
import { MAX_LENGTH_TEXT_OTHER, resolverReasonBarters, TReasonBarters } from "./utils/schema"

import styles from "./styles/style.module.scss"

export const ReasonBarters = () => {
  const [loading, setLoading] = useState(false)
  const { onBarters } = useToast()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const visible = useReasonBarters(({ visible }) => visible)
  const barterId = useReasonBarters(({ barterId }) => barterId)
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TReasonBarters>({
    defaultValues: {
      type: ETypeReason["found-specialist"],
      text: "",
    },
    resolver: resolverReasonBarters,
  })

  console.log("errors: ", errors)

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
    <div
      className={cx("wrapper-fixed", styles.wrapper, "bg-translucent p-0 md:py-10 md:px-6 flex flex-col items-center max-md:justify-end")}
      data-visible={visible}
    >
      <section
        data-section-modal
        className="w-full relative p-5 pb-0 pt-8 md:p-10 bg-BG-second rounded-t-2 md:rounded-2 flex flex-col gap-3.5"
      >
        <ButtonClose position={{}} onClick={handleClose} />
        <h2 className="text-text-primary text-2xl font-semibold">Пожалуйста, укажите причину несостоявшегося обмена</h2>
        <form onSubmit={onSubmit} className="w-full h-full flex flex-col gap-[1.875rem] overflow-y-auto max-md:pb-5">
          <div data-content className="w-full flex flex-col gap-6">
            <p className="text-text-secondary text-sm font-normal">
              Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей
            </p>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <ul {...field} className="w-full flex flex-col gap-2.5">
                  {MENU_REASON.map((item) => (
                    <fieldset
                      key={`::key::reason::menu::${item.value}::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        field.onChange(item.value as ETypeReason)
                      }}
                      className="w-full flex items-start gap-3 cursor-pointer"
                    >
                      <div
                        className={cx(
                          "w-4 h-4 p-2 aspect-square rounded-full border border-solid border-element-accent-1 transition-all duration-200",
                          field.value === item.value ? "bg-element-accent-1" : "bg-transparent",
                        )}
                      />
                      <label className="text-text-primary text-base font-normal">{item.label}</label>
                    </fieldset>
                  ))}
                </ul>
              )}
            />
            {watch("type") === ETypeReason.other ? (
              <Controller
                name="text"
                control={control}
                rules={{
                  required: watch("type") === ETypeReason.other,
                  maxLength: MAX_LENGTH_TEXT_OTHER,
                }}
                render={({ field: f, fieldState }) => (
                  <div data-text-area className="relative -mt-3">
                    <textarea
                      {...f}
                      maxLength={MAX_LENGTH_TEXT_OTHER}
                      onChange={(event) => f.onChange(event.target.value.replace(/\s{2,}/g, " "))}
                      placeholder="Опишите причину своими словами..."
                      data-error={!!fieldState.error}
                    />
                    <span
                      className={cx(
                        "absolute right-[0.875rem] bottom-1 top-auto h-min",
                        f.value.length > MAX_LENGTH_TEXT_OTHER - 30 && "text-text-error",
                      )}
                      data-more={f.value.length > MAX_LENGTH_TEXT_OTHER - 30}
                    >
                      {fieldState.error?.message ? fieldState.error.message : null}&nbsp;
                      <span>{f.value.length || 0}</span>/{MAX_LENGTH_TEXT_OTHER}
                    </span>
                  </div>
                )}
              />
            ) : null}
          </div>
          <footer className="w-full">
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Отправить"
              loading={loading}
              disabled={watch("type") === "other" && !watch("text")}
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
