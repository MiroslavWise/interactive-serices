"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/common"

import { getUserId } from "@/services"
import { dispatchChangeService, useAuth } from "@/store"

import styles from "./style.module.scss"
import { IconCategory } from "@/lib/icon-set"

export const BlockDesiredServices = () => {
  const userId = useAuth(({ userId }) => userId)

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
    dispatchChangeService({ visible: true })
  }

  return (
    <div className={styles.container}>
      <p>Желаемые услуги</p>
      {isLoading ? (
        <div />
      ) : desiredServices?.length > 0 ? (
        <>
          <section>
            {desiredServices.map((item) => (
              <div key={`::key::service::desired::${item.id}::`} data-item>
                <div data-img>
                  <img
                    src={IconCategory(item.id)}
                    alt="category"
                    width={16}
                    height={16}
                    onError={(error: any) => {
                      if (error?.target) {
                        try {
                          error.target.src = IconCategory(item.id)
                        } catch (e) {
                          console.log("catch e: ", e)
                        }
                      }
                    }}
                  />
                </div>
                <p>{item.title}</p>
              </div>
            ))}
          </section>
          <Button type="button" typeButton="regular-primary" label="Изменить" onClick={addDesiredService} />
        </>
      ) : (
        <article>
          <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить</p>
          <Button type="button" typeButton="white" label="Добавить" onClick={addDesiredService} />
        </article>
      )}
    </div>
  )
}
