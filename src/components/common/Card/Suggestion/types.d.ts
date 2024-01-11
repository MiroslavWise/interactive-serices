import type { IResponseOffers } from "@/services/offers/types"
import type { FC } from "react"

export interface ICardSuggestion extends IResponseOffers {
    refetch(): Promise<any>
}

export type TCardSuggestion = FC<ICardSuggestion>
