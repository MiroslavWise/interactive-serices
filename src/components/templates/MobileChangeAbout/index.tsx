"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { getProfile, patchProfile } from "@/services"
import { LIMIT_LENGTH_ABOUT, MIN_LENGTH_ABOUT, resolverAboutSchema, TAboutSchema } from "./utils/about.schema"
import { useAuth, dispatchMobileChangeAbout, useMobileChangeAbout } from "@/store"

import styles from "./styles/style.module.scss"

export const MobileChangeAbout = () => {
  const userId = useAuth(({ userId }) => userId)
  const visible = useMobileChangeAbout(({ visible }) => visible)
  const [loading, setLoading] = useState(false)

  const { data, refetch } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["profile", userId!],
    enabled: !!userId && visible,
  })

  const about = data?.res?.about || ""

  const { control, watch, handleSubmit, setValue, formState } = useForm<TAboutSchema>({
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

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      const newValueAbout = values.about.trim()
      if (newValueAbout !== about) {
        setLoading(true)
        patchProfile({ about: values.about, enabled: true }).then((response) => {
          if (response.ok) {
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
    <div className={cx(styles.wrapper, "wrapper-fixed")} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={handleClose} />
        <header>
          <h3>Обо мне</h3>
        </header>
        <form onSubmit={onSubmit}>
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <div data-text-area-from>
                <textarea {...field} placeholder="Нажмите сюда, чтобы редактировать информацию о себе" />
                <sup data-error={field.value.length >= LIMIT_LENGTH_ABOUT}>
                  <span>{field.value.length >= LIMIT_LENGTH_ABOUT ? "Достигнут лимит символов" : ""}</span>
                  <span>
                    {field.value.length || 0}/{LIMIT_LENGTH_ABOUT}
                  </span>
                </sup>
              </div>
            )}
          />
          <div data-buttons>
            <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={watch("about").length <= MIN_LENGTH_ABOUT} />
            <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleClose} />
          </div>
        </form>
      </section>
    </div>
  )
}
