import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ImageCategory } from "@/components/common"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { titleOffer } from "@/utils/title-offer"

function ItemTitle({ offer }: { offer: IResponseOffers }) {
  const { title, category, provider, categoryId, urgent } = offer ?? {}

  return (
    <section className="w-full gap-2.5 grid grid-cols-[1.5rem_minmax(0,1fr)]">
      <div className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:h-6 *:w-6">
        {provider === EnumTypeProvider.offer ? (
          <ImageCategory slug={category?.slug} provider={category?.provider} isUrgent={!!urgent} />
        ) : provider === EnumTypeProvider.discussion ? (
          <IconDiscussionBalloon />
        ) : provider === EnumTypeProvider.alert ? (
          <IconAlertCirlceRed />
        ) : null}
      </div>
      <h2 className=" text-text-primary text-base font-semibold line-clamp-2 text-ellipsis">{titleOffer(title, provider)}</h2>
    </section>
  )
}

ItemTitle.displayName = "ItemTitle"
export default ItemTitle
