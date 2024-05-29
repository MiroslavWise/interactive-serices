"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { useAuth_ } from "@/store"
import { serviceNotifications } from "@/services"
import { NAVIGATION_STATUSES, type TTypeWaiting } from "@/components/templates/NotificationsMobile/constants/navigation"
import { EnumStatusBarter } from "@/types/enum"

export default function Notifications() {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
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

  // const user = 19592 //я
  // const allNotifications = dataNotifications?.res!
  // //@ts-ignore
  // const barter: IBarterResponse

  // async function patchBarters(values: IPatchDataBarter) {
  //     if (["destroyed", "completed"].includes(values.status!)) {
  //         if (user === barter?.initiator?.userId) {
  //             const notificationsSurvey = allNotifications?.find(
  //                 (item) => item.userId === barter?.consigner?.userId && item.operation === "completion-survey" && item?.data?.id === barter?.id,
  //             )!

  //             await serviceNotifications.patch(
  //                 { enabled: false, operation: values?.status === "completed" ? "completion-yes" : "completion-no" },
  //                 notificationsSurvey?.id,
  //             )
  //             //await создать обоим уведомление с operation:completion-recall activator:user
  //             //отправить обоим сокет
  //         }
  //         if (user === barter?.consigner?.userId) {
  //             const notificationsSurvey = allNotifications?.find(
  //                 (item) => item.userId === barter?.initiator?.userId && item.operation === "completion-survey" && item?.data?.id === barter?.id,
  //             )!

  //             await serviceNotifications.patch(
  //                 { enabled: false, operation: values?.status === "completed" ? "completion-yes" : "completion-no" },
  //                 notificationsSurvey?.id,
  //             )
  //             //await создать обоим уведомление с operation:completion-recall activator:user
  //             //отправить обоим сокет
  //         }
  //     }
  // }

  return (
    <>
      <header>
        <h4>Уведомления</h4>
        <nav>
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
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      {!!stateNotifications?.length && status === "all" ? (
        <ul>
          {stateNotifications?.map((item) => (
            <ItemNotification key={`::notification::all:${item.id}::`} {...item} />
          ))}
        </ul>
      ) : !!waitingNotifications?.length && status === "waiting" ? (
        <ul>
          {waitingNotifications?.map((item) => (
            <ItemNotification key={`::notification::waiting::${item.id}::`} {...item} />
          ))}
        </ul>
      ) : (
        <article>
          <h2>У вас пока нет уведомлений</h2>
          <p>
            Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое другое. Вы будете
            проинформированы обо всем важном.
          </p>
        </article>
      )}
    </>
  )
}
