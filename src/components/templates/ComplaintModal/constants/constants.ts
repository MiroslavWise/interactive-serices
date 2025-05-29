import { IValuesForm } from "../types/types"

export const MENU_COMPLAINT: IMenuReason[] = [
  {
    value: "fraud",
    label: "Мошенничество или обмен контактными данными",
  },
  {
    value: "demeanor",
    label: "Неуместное поведение",
  },
  {
    value: "insult",
    label: "Оскорбительной контент",
  },
  {
    value: "spam",
    label: "Спам",
  },
  {
    value: "other",
    label: "Другое",
  },
]

interface IMenuReason {
  value: IValuesForm["type"]
  label: string
}
