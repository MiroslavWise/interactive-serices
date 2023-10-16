import type { FC } from "react"

import type { IBarterResponse } from "@/services/barters/types"
export interface ICardOffer extends IBarterResponse {
    refetch?: () => Promise<any>
}

export type TCardOffer = FC<ICardOffer>
