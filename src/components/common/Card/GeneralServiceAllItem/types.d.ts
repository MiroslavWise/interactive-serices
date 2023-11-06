import type { FC } from "react"

import type { IResponseOffers } from "@/services/offers/types"

export interface IGeneralServiceAllItem extends IResponseOffers {
    className?: string
}

export type TGeneralServiceAllItem = FC<IGeneralServiceAllItem>
