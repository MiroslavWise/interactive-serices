import { IPosts } from "@/services/posts/types"
import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"

import ButtonToChat from "./ButtonToChat"
import ButtonToParticipants from "./ButtonToParticipants"
import ButtonAdvertAction from "./ButtonAdvertAction"

interface IProps {
  provider: EnumTypeProvider
  offer?: IResponseOffers
  post?: IPosts
}

function AdvertButtons({ provider, offer, post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const company = provider === EnumTypeProvider.offer ? offer?.company : provider === EnumTypeProvider.POST ? post?.company : undefined
  const { actions = [] } = company ?? {}

  const isEmptyAction = actions.length === 0
  const isEmptyOffer = provider === EnumTypeProvider.offer && ((!!userId && userId === offer?.userId) || !userId)
  const isEmptyPosts = provider === EnumTypeProvider.POST && userId === post?.userId

  const isEmpty = (isEmptyOffer || isEmptyPosts) && isEmptyAction

  return (
    <footer className={cx("flex-row items-center justify-start gap-2", isEmpty ? "hidden" : "flex")}>
      {provider === EnumTypeProvider.offer ? <ButtonToChat offer={offer!} /> : null}
      {provider === EnumTypeProvider.POST ? <ButtonToParticipants post={post!} /> : null}
      <ButtonAdvertAction actions={actions} provider={provider} offer={offer} post={post} />
    </footer>
  )
}

export default AdvertButtons
