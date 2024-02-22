import { EnumTypeProvider } from "@/types/enum"
import type { IResponseOffers } from "@/services/offers/types"

import { GeneralOffer } from "./Offer"
import { GeneralDiscussion } from "./Discussion"
import { GeneralAlert } from "./Alert"

const mapItems: Map<EnumTypeProvider, ({ offer }: { offer: IResponseOffers }) => JSX.Element> = new Map([
  [EnumTypeProvider.offer, ({ offer }) => <GeneralOffer {...{ offer }} />],
  [EnumTypeProvider.discussion, ({ offer }) => <GeneralDiscussion {...{ offer }} />],
  [EnumTypeProvider.alert, ({ offer }) => <GeneralAlert {...{ offer }} />],
])

export const GeneralItem = ({ offer }: { offer: IResponseOffers }) => {
  try {
    return mapItems.has(offer?.provider!) ? mapItems.get(offer?.provider!)!({ offer }) : null
  } catch (e) {
    return null
  }
}
