"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"

import { useToast } from "@/helpers/hooks/useToast"
import {
  dispatchAddCountNotificationCreateService,
  dispatchModal,
  EModalData,
  openCreateOffers,
  useAuth,
  useNotificationCreateService,
} from "@/store"

const DESCRIPTION = new Map([
  [1, "Мы знаем, что вы талантливы. Как насчет того, чтобы разместить свое предложение услуг на карте? Попробуйте!"],
  [2, "Потеряли кошку, нашли чужой телефон? Сообщите о любом проишествии в Sheira — пусть люди помогут!"],
  [
    3,
    "Хотите обсудить новую спортплощадку или организовать турнир по настолкам с соседями? Разместите карточку дискуссии на карте — и обсудите важный вопрос с другими Sheira-жителями.",
  ],
])

const TITLE = new Map([
  [1, "Создайте предложение"],
  [2, "Создайте SOS-сообщение"],
  [3, "Создайте дискуссию"],
])

const BUTTON_LABEL = new Map([
  [1, "Создать предложение"],
  [2, "Создать SOS-сообщение"],
  [3, "Создать дискуссию"],
])

const BUTTON_ON_CLICK = new Map([
  [1, () => openCreateOffers(EnumTypeProvider.offer)],
  [2, () => openCreateOffers(EnumTypeProvider.alert)],
  [3, () => openCreateOffers(EnumTypeProvider.discussion)],
])

function NotificationCreateService() {
  const { onBarters } = useToast()
  const auth = useAuth(({ auth }) => auth)
  const { id, counter } = auth ?? {}
  const userCount = useNotificationCreateService((_) => _)

  useEffect(() => {
    if (id && typeof counter === "number") {
      const currentCounter = counter ?? 0
      const counterOld = userCount?.[id] ?? 0

      if (currentCounter % 5 === 0 && currentCounter !== counterOld) {
        const int = () => Math.floor(Math.random() * 3) + 1
        const getInt = int()

        onBarters({
          message: DESCRIPTION.get(getInt)!,
          title: TITLE.get(getInt)!,
          status: null,
          button: {
            label: BUTTON_LABEL.get(getInt)!,
            onClick: () => {
              dispatchModal(EModalData.CreateNewOptionModal)
              BUTTON_ON_CLICK.get(getInt)!()
            },
          },
        })
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
