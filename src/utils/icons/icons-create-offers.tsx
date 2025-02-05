import { EnumTypeProvider } from "@/types/enum"

import IconPost from "@/components/icons/IconPost"
import IconOfferBalloon from "@/components/icons/IconOfferBalloon"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import { IconSprite } from "@/components/icons/icon-sprite"

export const mapIconCreateOffer = new Map([
  [
    EnumTypeProvider.alert,
    <div
      className="w-8 h-8 rounded-2xl bg-text-error flex items-center justify-center p-1.5 group-hover:bg-text-button relative"
      data-alert
      key={`::item::key::alert::svg::`}
    >
      <IconSprite id="alert-balloon-20-20" />
    </div>,
  ],
  [EnumTypeProvider.offer, <IconOfferBalloon key={`::item::key::offer::svg::`} />],
  [EnumTypeProvider.discussion, <IconDiscussionBalloon key={`::item::key::discussion::svg::`} />],
  [EnumTypeProvider.POST, <IconPost key={`::item::key::post::svg::`} />],
])
