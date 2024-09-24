"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { LIMIT_LENGTH_ABOUT, MIN_LENGTH_ABOUT, resolverAboutSchema, TAboutSchema } from "./utils/about.schema"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserId, patchProfile } from "@/services"
import { useAuth, dispatchMobileChangeAbout, useMobileChangeAbout } from "@/store"

export const MobileChangeAbout = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const visible = useMobileChangeAbout(({ visible }) => visible)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  const { data, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId! }],
    enabled: !!userId && visible,
  })

  const isProfile = !!data?.data?.profile
  const about = data?.data?.profile?.about || ""

  const { control, watch, handleSubmit, setValue } = useForm<TAboutSchema>({
    resolver: resolverAboutSchema,
    defaultValues: {
      about: about ?? "",
    },
  })

  useEffect(() => {
    if (about) {
      setValue("about", about)
    }
  }, [about])

  useEffect(() => {
    if (watch("about")) {
      if (ref.current) {
        ref.current.style.height = "auto"
        ref.current.style.height = ref.current.scrollHeight + "px"
      }
    }
  }, [watch("about")])

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      const newValueAbout = values.about.trim()
      if (newValueAbout !== about) {
        setLoading(true)
        patchProfile({ about: values.about, enabled: true }).then((response) => {
          if (!!response.data) {
            refetch()
          }
          setLoading(false)
          handleClose()
        })
      } else {
        handleClose()
      }
    }
  })

  function handleClose() {
    dispatchMobileChangeAbout(false)
  }

  return (
    <div className={cx("wrapper-fixed", "bg-translucent p-0", visible && "!z-[2001] !opacity-100 !visible")}>
      <section data-section-modal className="relative h-full w-full bg-BG-second">
        <ButtonClose onClick={handleClose} className="z-50" />
        <header className="flex items-center justify-center w-full p-5 pb-4 z-[1] h-standard-header-modal border-b border-solid border-grey-separator">
          <h3 className="text-text-primary text-center text-2xl font-semibold">Обо мне</h3>
        </header>
        <form onSubmit={onSubmit} className="w-full h-full-minus-standard-header-modal p-5 flex flex-col gap-5">
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <div data-text-area-from className="w-full relative flex flex-col gap-2.5">
                <textarea
                  {...field}
                  placeholder="Нажмите сюда, чтобы редактировать информацию о себе"
                  ref={ref}
                  className="w-full min-h-12 rounded-none !border-none !outline-none resize-none"
                />
                <span
                  data-error={field.value.length >= LIMIT_LENGTH_ABOUT}
                  className={cx(
                    "w-full flex row items-center justify-between",
                    "*:text-xs font-normal",
                    field.value.length >= LIMIT_LENGTH_ABOUT ? "*:text-text-error" : "text-text-primary",
                  )}
                >
                  <span>{field.value.length >= LIMIT_LENGTH_ABOUT ? "Достигнут лимит символов" : ""}</span>
                  <span>
                    {field.value.length || 0}/{LIMIT_LENGTH_ABOUT}
                  </span>
                </span>
              </div>
            )}
          />
          <div className="mt-auto w-full flex flex-row items-center gap-3">
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Сохранить"
              disabled={watch("about").length <= MIN_LENGTH_ABOUT || !isProfile}
              title={isProfile ? "Сохранить описание" : "Создайте профиль"}
              aria-label={isProfile ? "Сохранить описание" : "Создайте профиль"}
              aria-labelledby={isProfile ? "Сохранить описание" : "Создайте профиль"}
            />
            <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleClose} />
          </div>
        </form>
      </section>
    </div>
  )
}
