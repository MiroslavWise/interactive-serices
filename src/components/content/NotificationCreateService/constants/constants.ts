import { EnumTypeProvider } from "@/types/enum"

import { openCreateOffers } from "@/store"

const DESCRIPTION = new Map([
  [1, "Мы знаем, что вы талантливы. Как насчет того, чтобы разместить свое предложение услуг на карте? Попробуйте!"],
  [2, "Потеряли кошку, нашли чужой телефон? Сообщите о любом проишествии в Sheira — пусть люди помогут!"],
  [
    3,
    "Хотите обсудить новую спортплощадку или организовать турнир по настолкам с соседями? Разместите карточку обсуждения на карте — и обсудите важный вопрос с другими Sheira-жителями.",
  ],
])

const TITLE = new Map([
  [1, "Создайте предложение"],
  [2, "Создайте SOS-сообщение"],
  [3, "Создайте обсуждение"],
])

const BUTTON_LABEL = new Map([
  [1, "Создать предложение"],
  [2, "Создать SOS-сообщение"],
  [3, "Создать обсуждение"],
])

const BUTTON_ON_CLICK = new Map([
  [1, () => openCreateOffers(EnumTypeProvider.offer)],
  [2, () => openCreateOffers(EnumTypeProvider.alert)],
  [3, () => openCreateOffers(EnumTypeProvider.discussion)],
])

function randomNotifications() {
  const int = () => Math.floor(Math.random() * 3) + 1
  const getInt = int()

  return {
    description: DESCRIPTION.get(getInt)!,
    title: TITLE.get(getInt)!,
    label: BUTTON_LABEL.get(getInt)!,
    click() {
      BUTTON_ON_CLICK.get(getInt)!()
    },
  }
}

export { randomNotifications }
