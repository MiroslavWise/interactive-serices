import { EnumTypeProvider } from "@/types/enum"
import type { INewCreateBadge } from "./types/types"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
  {
    label: "Предложение",
    value: EnumTypeProvider.offer,
  },
  {
    label: "SOS-сообщение",
    value: EnumTypeProvider.alert,
  },
  {
    label: "Обсуждение",
    value: EnumTypeProvider.discussion,
  },
]
export const NEW_CREATE_BADGES_ALERT_OR_DISCUSSION = NEW_CREATE_BADGES
