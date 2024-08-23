import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ImageCategory } from "@/components/common"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

function ItemTitle({ offer }: { offer: IResponseOffers }) {
  const { title, category, provider, categoryId } = offer ?? {}

  const titleH2 =
    provider === EnumTypeProvider.alert
      ? title || "SOS-сообщение"
      : provider === EnumTypeProvider.discussion
      ? title || "Обсуждение"
      : provider === EnumTypeProvider.offer
      ? category?.title || "Предложение"
      : null

  return (
    <section className="w-full gap-0.625 grid grid-cols-[1.5rem_minmax(0,1fr)]">
      <div className="relative w-6 h-6 p-3 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-6 [&>svg]:w-6 [&>img]:absolute [&>img]:top-1/2 [&>img]:left-1/2 [&>img]:-translate-x-1/2 [&>img]:-translate-y-1/2 [&>img]:h-6 [&>img]:w-6">
        {provider === EnumTypeProvider.offer ? (
          <ImageCategory id={categoryId!} slug={category?.slug} provider={category?.provider} />
        ) : provider === EnumTypeProvider.discussion ? (
          <IconDiscussionBalloon />
        ) : provider === EnumTypeProvider.alert ? (
          <IconAlertCirlceRed />
        ) : null}
      </div>
      <h2 className=" text-text-primary text-base font-semibold line-clamp-2 text-ellipsis">{titleH2}</h2>
    </section>
  )
}

ItemTitle.displayName = "ItemTitle"
export default ItemTitle
