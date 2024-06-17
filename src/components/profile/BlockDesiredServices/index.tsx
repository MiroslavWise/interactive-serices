"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button, ImageCategory } from "@/components/common"

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
    if (!data?.res) return []

    return data?.res?.categories
  }, [data?.res])

  function addDesiredService() {
    dispatchActiveServicesFrom(true)
  }

  return (
    <div className={styles.container} data-test="profile-block-desired-services">
      <p>Желаемые услуги</p>
      {isLoading ? (
        <div />
      ) : desiredServices?.length > 0 ? (
        <>
          <section>
            {desiredServices.map((item) => (
              <div key={`::key::service::desired::${item.id}::`} data-item>
                <div data-img>
                  <ImageCategory id={item.id!} />
                </div>
                <p>{item.title}</p>
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
        <article>
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
