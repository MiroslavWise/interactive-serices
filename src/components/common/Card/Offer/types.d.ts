import type { FC } from "react"

import type { IBarterResponse } from "@/services/barters/bartersService"
export interface ICardOffer extends IBarterResponse {
    refetch?: () => Promise<any>
}

export type TCardOffer = FC<ICardOffer>
