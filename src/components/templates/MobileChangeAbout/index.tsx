"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import type { IValue } from "./types"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { getProfileUserId, patchProfile } from "@/services"
import { useAuth, dispatchMobileChangeAbout, useMobileChangeAbout } from "@/store"

import styles from "./style.module.scss"

const LIMIT = 512

export const MobileChangeAbout = () => {
  const userId = useAuth(({ userId }) => userId)
  const visible = useMobileChangeAbout(({ visible }) => visible)
  const [loading, setLoading] = useState(false)

  const {
    data: dataProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId!],
    enabled: !!userId && visible,
  })

  const idProfile = dataProfile?.res?.id
  const about = dataProfile?.res?.about || ""

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IValue>()

  useEffect(() => {
    if (about) {
      setValue("about", about)
    }
  }, [about])

  const onSubmit = handleSubmit((data) => {
    if (!loading) {
      setLoading(true)
      if (!!idProfile) {
        patchProfile({ about: data.about, enabled: true }).then((response) => {
          if (response.ok) {
            refetch()
          }
          setLoading(false)
          handleClose()
        })
      } else {
        setLoading(false)
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
          <div data-text-area-from>
            {!isLoading ? (
              <textarea
                {...register("about", { maxLength: 512 })}
                placeholder="Нажмите сюда, чтобы редактировать информацию о себе"
                maxLength={512}
              />
            ) : null}
            <sup data-error={watch("about")?.length >= LIMIT}>
              <span>{watch("about")?.length >= LIMIT ? "Достигнут лимит символов" : ""}</span>
              <span>
                {watch("about")?.length || 0}/{LIMIT}
              </span>
            </sup>
          </div>
          <div data-buttons>
            <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={watch("about")?.trim() === about?.trim()} />
            <Button type="button" typeButton="regular-primary" label="Отменить" onClick={handleClose} />
          </div>
        </form>
      </section>
    </div>
  )
}
