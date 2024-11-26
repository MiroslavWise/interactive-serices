import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { type IResponseNotifications } from "@/services/notifications/types"

import Button from "@/components/common/Button"

import { getBarterId, patchBarter, serviceNotifications } from "@/services"
import { dispatchReasonBarters, dispatchVisibleNotifications } from "@/store"

interface IProps {
  refetch(): Promise<any>
  notification: IResponseNotifications
}

function ButtonsToComplete({ notification, refetch }: IProps) {
  const { read, id, data, provider } = notification ?? {}
  const [loading, setLoading] = useState(false)

  const { id: barterId } = data ?? {}

  const { refetch: refetchBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: false,
  })

  function reading() {
    if (!read) {
      serviceNotifications.patch({ enabled: true, read: true }, id!).then((response) => {
        if (response.ok) refetch()
      })
    }
  }

  function handleCompletion(value: boolean) {
    if (!loading) {
      if (value) {
        setLoading(true)
        if (provider === "barter") {
          patchBarter({ enabled: true, status: EnumStatusBarter.COMPLETED }, barterId!).then(() => {
            refetchBarter()
            refetch().then(() => {
              setLoading(false)
            })
          })
        } else {
          setLoading(false)
        }
      } else {
        dispatchReasonBarters({
          visible: true,
          notificationId: id!,
          barterId: data?.id!,
        })
        dispatchVisibleNotifications(false)
      }
    }
  }

  return (
    <>
      <Button
        type="button"
        typeButton="fill-primary"
        label="Да"
        onClick={(event) => {
          event.stopPropagation()
          handleCompletion(true)
        }}
        loading={loading}
        data-yes-or-not
      />
      <Button
        type="button"
        typeButton="regular-primary"
        label="Нет"
        onClick={(event) => {
          event.stopPropagation()
          handleCompletion(false)
          reading()
        }}
        loading={loading}
        data-yes-or-not
      />
    </>
  )
}
ButtonsToComplete.displayName = "ButtonsToComplete"
export default ButtonsToComplete
