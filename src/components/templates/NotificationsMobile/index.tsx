"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { cx } from "@/lib/cx"
import { serviceNotifications } from "@/services"
import { type TTypeWaiting, NAVIGATION_STATUSES } from "./constants/navigation"
import { useVisibleNotifications, dispatchVisibleNotifications, useAuth } from "@/store"

import styles from "./styles/style.module.scss"
import { EnumStatusBarter } from "@/types/enum"
import { IconXClose } from "@/components/icons/IconXClose"

export function NotificationsMobile() {
  const userId = useAuth(({ userId }) => userId)
  const visible = useVisibleNotifications(({ visible }) => visible)

  const [status, setStatus] = useState<TTypeWaiting>("all")
  const [waitingNotifications, setWaitingNotifications] = useState<IResponseNotifications[]>([])
  const [state, setState] = useState<{ new: IResponseNotifications[]; old: IResponseNotifications[] }>({ new: [], old: [] })

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
      const newArray: IResponseNotifications[] = []
      const oldArray: IResponseNotifications[] = []

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
        if (item?.read) {
          oldArray.push(item)
        } else {
          newArray.push(item)
          arrayNotRead.push(item.id)
        }
      }

      setState({ new: newArray, old: oldArray })
      setWaitingNotifications(array)

      return () => {
        if (arrayNotRead?.length > 0) {
          Promise.all(arrayNotRead.map((item) => serviceNotifications.patch({ read: true, enabled: true }, item))).then((responses) => {
            if (responses.length > 0) {
              refetch()
            }
          })
        }
      }
    }
  }, [dataNotifications?.res, userId])

  const maps = dataNotifications?.res || []

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section>
        <header>
          <h3>Уведомления</h3>
          <button onClick={() => dispatchVisibleNotifications(false)}>
            <IconXClose />
          </button>
        </header>
        {maps.length ? (
          <nav>
            {NAVIGATION_STATUSES.map((item) => (
              <a
                key={`::${item.value}::key::nav::`}
                data-active={status === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  setStatus(item.value)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
        {[...state.new, ...state.old].length > 0 && status === "all" ? (
          <ul>
            {state.new.length > 0 ? (
              <>
                <p>Новые уведомления</p>
                {state.new?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} />
                ))}
              </>
            ) : null}
            {state.old.length > 0 ? (
              <>
                <p>Просмотренные</p>
                {state.old?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} />
                ))}
              </>
            ) : null}
          </ul>
        ) : waitingNotifications.length > 0 && status === "waiting" ? (
          <ul>
            {waitingNotifications.map((item) => (
              <ItemNotification key={`::notification::waiting::${item.id}::`} {...item} />
            ))}
          </ul>
        ) : (
          <article>
            <h3>У вас пока нет уведомлений</h3>
            <p>
              Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое другое. Вы
              будете проинформированы обо всем важном.
            </p>
          </article>
        )}
      </section>
    </div>
  )
}
