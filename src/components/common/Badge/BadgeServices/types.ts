import type { DispatchWithoutAction, FC } from "react"
import type { ISmallDataOfferBarter } from "@/services/barters/types"

export interface IBadgeServices extends ISmallDataOfferBarter {
  isClickable?: boolean
}

export type TBadgeServices = FC<IBadgeServices>
