import { ETypeReason } from "@/services/barters/types"

export const MENU_REASON: IMenuReason[] = [
  {
    value: ETypeReason["found-specialist"],
    label: "Уже нашёл(а) специалиста на другом сайте",
  },
  {
    value: ETypeReason["found-through-friend"],
    label: "Уже нашёл(а) специалиста через знакомых",
  },
  {
    value: ETypeReason.circumstances,
    label: "Изменились обстоятельства",
  },
  {
    value: ETypeReason.specialists,
    label: "Не подошли специалисты",
  },
  {
    value: ETypeReason["company-service"],
    label: "Не устроил сервис компании",
  },
  {
    value: ETypeReason.spam,
    label: "Это спам",
  },
  {
    value: ETypeReason.other,
    label: "Другое",
  },
]

interface IMenuReason {
  value: ETypeReason
  label: string
}
