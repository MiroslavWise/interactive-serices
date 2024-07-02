"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"

import {
  dispatchAddCountNotificationCreateService,
  dispatchBallonOffer,
  dispatchModal,
  dispatchOnboarding,
  EModalData,
  useAuth,
  useBounds,
  useNotificationCreateService,
} from "@/store"
import { getOffers } from "@/services"
import { queryClient } from "@/context"
import { useToast } from "@/helpers/hooks/useToast"
import { randomNotifications } from "./constants/constants"

function NotificationCreateService() {
  const { onBarters } = useToast()
  const auth = useAuth(({ auth }) => auth)
  const { id, counter } = auth ?? {}
  const userCount = useNotificationCreateService((_) => _)
  const bounds = useBounds(({ bounds }) => bounds)

  async function firstOffer() {
    const { res, ok } = await queryClient.fetchQuery({
      queryFn: () => getOffers({ order: "DESC", provider: EnumTypeProvider.offer }),
      queryKey: ["offers", { provider: EnumTypeProvider.offer }],
    })

    if (ok && !!res) {
      if (!bounds) {
        return {
          offer: res[0],
        }
      }

      let firstAdd = res[0].addresses[0].coordinates.split(" ").map(Number)
      let offer = res[0]
      const b = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]

      for (const item of res) {
        const distanceOld = Math.abs(Math.abs(firstAdd[0]) - Math.abs(b[0])) + Math.abs(Math.abs(firstAdd[1]) - Math.abs(b[1]))
        const distanceNew =
          Math.abs(Math.abs(offer.addresses[0].coordinates.split(" ").map(Number)[0]) - Math.abs(b[0])) +
          Math.abs(Math.abs(offer.addresses[0].coordinates.split(" ").map(Number)[1]) - Math.abs(b[1]))

        if (distanceNew < distanceOld) {
          offer = item
        }
      }

      return {
        offer: offer,
      }
    } else {
      return {
        offer: null,
      }
    }
  }

  function handleOpen() {
    dispatchOnboarding("open")
  }

  useEffect(() => {
    if (id && typeof counter === "number") {
      const currentCounter = counter ?? 0
      const counterOld = userCount?.[id] ?? 0

      if (currentCounter !== counterOld) {
        if (currentCounter % 5 === 0) {
          const r = randomNotifications()

          onBarters({
            message: r.description,
            title: r.title,
            status: null,
            button: {
              label: r.label,
              onClick: () => {
                dispatchModal(EModalData.CreateNewOptionModal)
                r.click()
              },
            },
          })
        } else {
          if (currentCounter % 3 === 0 && currentCounter % 2 !== 0 && currentCounter % 9 !== 0) {
            const MESSAGE = "Хотите лучше узнать как работает Sheira? Мы расскажем вам в слайдах!"
            const LABEL = "Показать инструкцию"

            onBarters({
              message: MESSAGE,
              status: null,
              button: {
                label: LABEL,
                onClick: handleOpen,
              },
            })
          }
          if (currentCounter % 6 === 0) {
            const MESSAGE = "Запутались в карточках? Воспользуйтесь фильтром — он позволяет выбрать карточки конкретных категорий"
            const LABEL = "Понятно"

            onBarters({
              message: MESSAGE,
              status: null,
              button: {
                label: LABEL,
                onClick: () => {},
              },
            })
          }
          if (currentCounter % 9 === 0 && currentCounter % 2 !== 0) {
            const MESSAGE =
              "Кстати, в Sheira есть полноценный мессенджер. Вы можете написать любому Sheira-жителю через иконку в карточке. Общайтесь!"
            const LABEL = "Супер!"

            onBarters({
              message: MESSAGE,
              status: null,
              button: {
                label: LABEL,
                onClick: async () => {
                  const { offer } = await firstOffer()
                  if (offer) {
                    dispatchBallonOffer({ offer: offer })
                  }
                },
              },
            })
          }
        }
      }
      setTimeout(() => {
        dispatchAddCountNotificationCreateService({ userId: id, count: currentCounter! })
      })
    }
  }, [id, counter, userCount])

  return null
}

NotificationCreateService.displayName = "NotificationCreateService"
export default NotificationCreateService
