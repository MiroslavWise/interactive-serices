"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button, ImageCategory } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { dispatchActiveServicesFrom, useAuth } from "@/store"

import styles from "./style.module.scss"

export const BlockDesiredServices = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const desiredServices = useMemo(() => {
    if (!data?.data) return []

    return data?.data?.categories
  }, [data?.data])

  function addDesiredService() {
    dispatchActiveServicesFrom(true)
  }

  return (
    <div className={cx(styles.container, "w-full flex flex-col gap-2.5")} data-test="profile-block-desired-services">
      <p className="text-text-primary text-sm font-medium">Желаемые услуги</p>
      {isLoading ? (
        <div />
      ) : desiredServices?.length > 0 ? (
        <>
          <section className="w-full flex gap-1.5 flex-wrap">
            {desiredServices.map((item) => (
              <div
                key={`::key::service::desired::${item.id}::`}
                data-item
                className="w-fit max-w-full py-1 pl-1 pr-1.5 grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-1 border border-solid border-grey-stroke-light bg-BG-second h-8 rounded-2xl"
              >
                <div
                  data-img
                  className={cx(
                    "w-6 h-6 rounded-xl bg-BG-icons p-3 relative",
                    "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4",
                  )}
                >
                  <ImageCategory id={item.id!} />
                </div>
                <p className="text-text-primary text-sm text-left font-normal line-clamp-1 text-ellipsis whitespace-nowrap">{item.title}</p>
              </div>
            ))}
          </section>
          <Button
            type="button"
            typeButton="regular-primary"
            label="Изменить"
            onClick={addDesiredService}
            data-test="profile-block-desired-services-button-on-modal-change"
          />
        </>
      ) : (
        <article className="w-full flex flex-col gap-3 rounded-xl p-3 bg-more bg-element-accent-1">
          <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить</p>
          <Button
            type="button"
            typeButton="white"
            label="Добавить"
            onClick={addDesiredService}
            data-test="profile-block-desired-services-button-on-modal-add"
          />
        </article>
      )}
    </div>
  )
}
