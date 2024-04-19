import dynamic from "next/dynamic"

import { EnumTypeProvider } from "@/types/enum"
import type { IResponseOffers } from "@/services/offers/types"

const GeneralAlert = dynamic(() => import("./Alert"), { ssr: false })
const GeneralDiscussion = dynamic(() => import("./Discussion"), { ssr: false })
const GeneralOffer = dynamic(() => import("./Offer"), { ssr: false })

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
