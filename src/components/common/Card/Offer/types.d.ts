import type { DispatchWithoutAction, FC } from "react"

import type { IBarterResponse } from "@/services/barters/types"
export interface ICardOffer extends IBarterResponse {
    refetch?: (() => Promise<any>) | DispatchWithoutAction
}

export type TCardOffer = FC<ICardOffer>
