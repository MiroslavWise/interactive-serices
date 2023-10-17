import type { DispatchWithoutAction, FC } from "react"
import type { TTypeProvider } from "@/services/file-upload/types"
import type { ISmallDataOfferBarter } from "@/services/barters/types"

export interface IBadgeServices extends ISmallDataOfferBarter {
    isClickable?: boolean
}

export type TBadgeServices = FC<IBadgeServices>
