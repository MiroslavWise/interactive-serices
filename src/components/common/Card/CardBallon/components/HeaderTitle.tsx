import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ImageCategory } from "@/components/common/Image"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { titleOffer } from "@/utils/title-offer"

interface IProps {
  offer: IResponseOffers
}

function HeaderTitle({ offer }: IProps) {
  const { provider, categoryId, title, category, urgent } = offer ?? {}

  return (
    <header data-provider={provider} className="w-full flex flex-row items-start gap-3 overflow-hidden">
      <div className="relative h-[1.625rem] w-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
        {provider === EnumTypeProvider.offer ? (
          <ImageCategory id={categoryId!} slug={category?.slug} provider={category?.provider} isUrgent={!!urgent} />
        ) : provider === EnumTypeProvider.alert ? (
          <IconAlertCirlceRed />
        ) : provider === EnumTypeProvider.discussion ? (
          <IconDiscussionBalloon />
        ) : null}
      </div>
      <h3 className="text-text-primary text-base font-semibold">{titleOffer(title, provider)}</h3>
    </header>
  )
}

export default HeaderTitle
