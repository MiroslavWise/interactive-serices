import type { FC } from "react"

import type { IBarterResponse } from "@/services/barters/bartersService"
export interface ICardOffer extends IBarterResponse {}

export type TCardOffer = FC<ICardOffer>
