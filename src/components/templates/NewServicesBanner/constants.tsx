import { EnumTypeProvider } from "@/types/enum"
import type { INewCreateBadge } from "./types/types"

import IconOfferBalloon from "@/components/icons/IconOfferBalloon"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
  {
    imageSrc: <IconOfferBalloon />,
    label: "Предложение",
    value: EnumTypeProvider.offer,
  },
  {
    imageSrc: <IconAlertBalloon />,
    label: "SOS-сообщение",
    value: EnumTypeProvider.alert,
  },
  {
    imageSrc: <IconDiscussionBalloon />,
    label: "Обсуждение",
    value: EnumTypeProvider.discussion,
  },
]
export const NEW_CREATE_BADGES_ALERT_OR_DISCUSSION = NEW_CREATE_BADGES
