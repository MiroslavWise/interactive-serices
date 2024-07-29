"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import type { IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { serviceNotifications } from "@/services"
import {
  DESCRIPTION_NOTIFICATIONS_EMPTY,
  NAVIGATION_STATUSES,
  type TTypeWaiting,
} from "@/components/templates/NotificationsMobile/constants/navigation"

import styles from "./layout.module.scss"

export default function Notifications() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [status, setStatus] = useState<TTypeWaiting>("all")

  const [stateNotifications, setStateNotifications] = useState<IResponseNotifications[]>([])
  const [waitingNotifications, setWaitingNotifications] = useState<IResponseNotifications[]>([])

  const { data: dataNotifications, refetch } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: !!userId,
  })

  useEffect(() => {
    const values = dataNotifications?.res

    if (values && userId) {
      const array: IResponseNotifications[] = []
      const arrayNotRead: number[] = []

      for (const item of values) {
        if (item?.provider === "barter") {
          if (item?.data?.status === EnumStatusBarter.INITIATED) {
            if (item?.data?.userId !== userId) {
              array.push(item)
            }
          }
          if (["completion-survey", "completion-recall", "completion-recall-no"].includes(item?.operation!)) {
            array.push(item)
          }
        }
        if (!item.read && typeof item.read !== "undefined") {
          arrayNotRead.push(item.id)
        }
      }

      const timer = setTimeout(() => {
        Promise.all(arrayNotRead.map((item) => serviceNotifications.patch({ read: true, enabled: true }, item))).then((responses) => {
          if (responses.length > 0) {
            refetch()
          }
        })
      }, 2 * 1000)

      setStateNotifications(values)
      setWaitingNotifications(array)

      return () => clearTimeout(timer)
    }
  }, [dataNotifications?.res, userId])

  return (
    <>
      <header className="w-full flex items-center justify-between gap-3">
        <h4 className="w-full text-text-primary text-xl font-semibold">Уведомления</h4>
        <nav className="w-fit h-[1.875rem] inline-flex items-center justify-end flex-nowrap gap-[1.125rem]">
          {NAVIGATION_STATUSES.map((item) => (
            <a
              key={`::${item.value}::key::nav::`}
              data-active={status === item.value}
              onClick={(event) => {
                event.stopPropagation()
                if (item.value !== status) {
                  setStatus(item.value)
                }
              }}
              className={cx(
                styles.a,
                "relative text-center text-sm font-medium whitespace-nowrap cursor-pointer",
                status === item.value ? "text-text-accent" : "text-text-secondary",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      {!!stateNotifications?.length && status === "all" ? (
        <ul className="flex flex-col gap-2.5 p-6 rounded-[2rem] bg-BG-second mb-6">
          {stateNotifications?.map((item) => (
            <ItemNotification key={`::notification::all:${item.id}::`} {...item} />
          ))}
        </ul>
      ) : !!waitingNotifications?.length && status === "waiting" ? (
        <ul className="flex flex-col gap-2.5 p-6 rounded-[2rem] bg-BG-second mb-6">
          {waitingNotifications?.map((item) => (
            <ItemNotification key={`::notification::waiting::${item.id}::`} {...item} />
          ))}
        </ul>
      ) : (
        <article className="w-full h-full rounded-[2rem] bg-BG-second py-10 px-[3.125rem] flex flex-col items-center gap-4 mr-6 *:w-full *:text-center">
          <h2 className="text-text-primary font-semibold">У вас пока нет уведомлений</h2>
          <p className="text-text-secondary font-medium">{DESCRIPTION_NOTIFICATIONS_EMPTY[status]}</p>
        </article>
      )}
    </>
  )
}
