import { IPosts } from "@/services/posts/types"
import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import ButtonToChat from "./ButtonToChat"
import ButtonToParticipants from "./ButtonToParticipants"
import ButtonAdvertAction from "./ButtonAdvertAction"
import { useAuth } from "@/store"
import { cx } from "@/lib/cx"

interface IProps {
  provider: EnumTypeProvider
  offer?: IResponseOffers
  post?: IPosts
}

function AdvertButtons({ provider, offer, post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const company = provider === EnumTypeProvider.offer ? offer?.company : provider === EnumTypeProvider.POST ? post?.company : undefined
  const { actions = [] } = company ?? {}

  const isEmpty = provider === EnumTypeProvider.offer && ((!!userId && userId === offer?.userId) || !userId) && actions.length === 0

  return (
    <footer className={cx("flex-row items-center justify-start gap-2", isEmpty ? "hidden" : "flex")}>
      {provider === EnumTypeProvider.offer ? <ButtonToChat offer={offer!} /> : null}
      {provider === EnumTypeProvider.POST ? <ButtonToParticipants post={post!} /> : null}
      <ButtonAdvertAction actions={actions} />
    </footer>
  )
}

export default AdvertButtons
