import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type IPatchOffers } from "@/services/offers/types"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserIdOffers, patchOffer } from "@/services"
import { resolverSchema, TSchema, LIMIT_DESCRIPTION } from "./shema"
import { dispatchUpdateDiscussionAndAlert, useAuth, useUpdateDiscussionAndAlert } from "@/store"

export const CN_UPDATE_DISCUSSION_AND_ALERT = "w-full md: max-w-[37.25rem] max-md:!rounded-none"

const onDescription = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert ? "Опишите проблему" : value === EnumTypeProvider.discussion ? "Ваш комментарий" : null

const onHeaderTitle = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert ? "Название проблемы" : value === EnumTypeProvider.discussion ? "Название обсуждения" : null

// const onPre = (value: EnumTypeProvider) =>
//   value === EnumTypeProvider.alert
//     ? "Видите, что что-то произошло, или вам нужна помощь? Просто дайте знать остальным"
//     : value === EnumTypeProvider.discussion
//     ? "Хотите что-то обсудить с другими пользователями Sheira? Создайте тему и будьте готовы участвовать в обсуждении"
//     : null

function UpdateDiscussionAndAlert() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const offer = useUpdateDiscussionAndAlert(({ offer }) => offer)
  const { id, title, description, provider, addresses } = offer ?? {}

  const firstAddress = addresses?.[0]
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: provider!, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: provider! }],
    enabled: false,
  })

  const { control, handleSubmit } = useForm<TSchema>({
    defaultValues: {
      description: description ?? "",
      title: title ?? "",
      address: additional,
    },
    resolver: resolverSchema,
  })

  const onSubmit = handleSubmit((values) => {
    const data: IPatchOffers = {}

    const newTitle = values.title.trim()
    if (newTitle !== title && !!newTitle) {
      data.title = newTitle
    }

    const newDescription = values.description.trim()
    if (newDescription !== description && !!newDescription) {
      data.description = newDescription
    }

    if (!loading) {
      if (Object.keys(data).length) {
        setLoading(true)
        patchOffer(data, id!).then((response) => {
          if (response.ok) {
            refetch()
            setTimeout(() => {
              dispatchUpdateDiscussionAndAlert({ visible: false })
            })
          }
          setLoading(false)
        })
      } else {
        setTimeout(() => {
          dispatchUpdateDiscussionAndAlert({ visible: false })
        })
      }
    }
  })

  // const pre = onPre(provider!)
  const labelTitle = onHeaderTitle(provider!)
  const labelDescription = onDescription(provider!)

  return (
    <>
      <header className="h-[var(--height-standard-header-modal)] md:pt-6 md:pb-5 flex items-center justify-center border-b border-solid border-grey-separator max-md:p-5 max-md:pb-4">
        <h3 className="text-text-primary text-center text-2xl font-semibold">Редактирование</h3>
      </header>
      <form
        className={cx(
          "w-full relative overflow-x-hidden overflow-y-auto h-[calc(100%_-_var(--height-standard-header-modal))] pt-5 md:px-[4.375rem] pb-[1.625rem] max-md:!p-5 flex flex-col gap-5",
          "[&>fieldset]:w-full [&>fieldset]:flex [&>fieldset]:flex-col [&>fieldset]:gap-2 [&>fieldset]:items-start",
          "[&>fieldset>label]:text-text-primary text-sm [&>fieldset>label]:text-left [&>fieldset>label]:font-medium",
          "[&>fieldset>i]:-mt-1 [&>fieldset>i]:text-text-error [&>fieldset>i]:not-italic [&>fieldset>i]:text-xs [&>fieldset>i]:font-medium",
        )}
        onSubmit={onSubmit}
      >
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <fieldset>
              <label htmlFor={field.name}>Ваш адрес</label>
              <input
                type="text"
                className={cx(
                  "w-full border border-solid border-grey-stroke resize-none text-sm font-normal !h-12 !rounded-3xl text-text-primary placeholder:text-text-secondary",
                  !!error && "!border-element-error",
                  "disabled:cursor-no-drop",
                )}
                disabled
                {...field}
              />
            </fieldset>
          )}
        />
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <fieldset>
              <label htmlFor={field.name}>{labelTitle}</label>
              <input
                type="text"
                className={cx(
                  "w-full border border-solid border-grey-stroke resize-none text-sm font-normal !h-12 !rounded-3xl text-text-primary placeholder:text-text-secondary",
                  !!error && "!border-element-error",
                )}
                {...field}
              />
              {!!error ? <i>{error.message}</i> : null}
            </fieldset>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <fieldset>
              <label htmlFor={field.name}>{labelDescription}</label>
              <div data-text-area className="relative w-full !border-none">
                <textarea
                  {...field}
                  className={cx(
                    "w-full !border !border-solid !border-grey-stroke !resize-none text-sm font-normal text-text-primary p-3.5 rounded-2xl placeholder:text-text-secondary",
                    !!error && "!border-element-error",
                  )}
                />
                <span className="absolute bottom-1.5 right-3 text-text-secondary text-xs font-medium">
                  {field.value.length}/{LIMIT_DESCRIPTION}
                </span>
              </div>
              {!!error ? <i>{error.message}</i> : null}
            </fieldset>
          )}
        />
        <footer className="w-full mt-auto">
          <Button loading={loading} label="Сохранить" type="submit" typeButton="fill-primary" className="h-11 rounded-[1.375rem]" />
        </footer>
      </form>
    </>
  )
}

UpdateDiscussionAndAlert.displayName = "UpdateDiscussionAndAlert"
export default UpdateDiscussionAndAlert
