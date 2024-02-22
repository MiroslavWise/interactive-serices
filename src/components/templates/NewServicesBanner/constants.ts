import { EnumTypeProvider } from "@/types/enum"
import type { INewCreateBadge } from "./types/types"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
  {
    imageSrc: "/svg/3d/3d-speaker.svg",
    label: "Предложение",
    value: EnumTypeProvider.offer,
  },
  {
    imageSrc: "/svg/3d/3d-sos.svg",
    label: "SOS",
    value: EnumTypeProvider.alert,
  },
  {
    imageSrc: "/svg/3d/3d-message.svg",
    label: "Обсуждение",
    value: EnumTypeProvider.discussion,
  },
]
export const NEW_CREATE_BADGES_ALERT_OR_DISCUSSION = NEW_CREATE_BADGES
