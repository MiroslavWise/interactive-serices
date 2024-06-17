import { EnumTypeProvider } from "@/types/enum"

import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import IconOfferBalloon from "@/components/icons/IconOfferBalloon"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

export const mapIconCreateOffer = new Map([
  [
    EnumTypeProvider.alert,
    <div
      className="w-8 h-8 rounded-2xl bg-text-error flex items-center justify-center p-0.375 group-hover:bg-text-button"
      data-alert
      key={`::item::key::alert::svg::`}
    >
      <IconAlertBalloon />
    </div>,
  ],
  [EnumTypeProvider.offer, <IconOfferBalloon key={`::item::key::offer::svg::`} />],
  [EnumTypeProvider.discussion, <IconDiscussionBalloon key={`::item::key::discussion::svg::`} />],
])
