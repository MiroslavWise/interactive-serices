import type { CSSProperties, FC } from "react"

import type { IResponseOffers } from "@/services/offers/types"

export interface IGeneralServiceAllItem extends IResponseOffers {
    className?: string
    style?: CSSProperties
}

export type TGeneralServiceAllItem = FC<IGeneralServiceAllItem>
