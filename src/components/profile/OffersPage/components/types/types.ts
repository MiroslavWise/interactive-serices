import type { Dispatch, FC } from "react"

import { EnumStatusBarter } from "@/types/enum"
import type { IActionOffers } from "../../types/types"

interface IContainerHeader {
  total: number
}

interface IContainerOffersNow {
  dispatch: Dispatch<IActionOffers>
}

interface IMobileSegments {}

export interface IOffersCard {
  label: string
  src: string
  value: EnumStatusBarter
}

export type TMobileSegments = FC<IMobileSegments>
export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>
