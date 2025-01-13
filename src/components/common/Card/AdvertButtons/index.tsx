import { IPosts } from "@/services/posts/types"
import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import ButtonToChat from "./ButtonToChat"
import ButtonToParticipants from "./ButtonToParticipants"
import ButtonAdvertAction from "./ButtonAdvertAction"

interface IProps {
  provider: EnumTypeProvider
  offer?: IResponseOffers
  post?: IPosts
}

function AdvertButtons({ provider, offer, post }: IProps) {
  const company = provider === EnumTypeProvider.offer ? offer?.company : provider === EnumTypeProvider.POST ? post?.company : undefined
  const { actions } = company ?? {}

  return (
    <footer className="flex flex-row items-center justify-start gap-2">
      {provider === EnumTypeProvider.offer ? <ButtonToChat offer={offer!} /> : null}
      {provider === EnumTypeProvider.POST ? <ButtonToParticipants post={post!} /> : null}
      <ButtonAdvertAction actions={actions} />
    </footer>
  )
}

export default AdvertButtons
