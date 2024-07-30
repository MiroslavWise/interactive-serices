import { type Dispatch, type FC } from "react"

import { EnumStatusBarter } from "@/types/enum"
import { type IActionOffers } from "../../types/types"

interface IContainerHeader {
  total: number
}

interface IContainerOffersNow {
  dispatch: Dispatch<IActionOffers>
}

interface IOffersCard {
  label: string
  src: string
  value: EnumStatusBarter
}

export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>
