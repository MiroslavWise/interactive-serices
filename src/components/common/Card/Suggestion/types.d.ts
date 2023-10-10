import { IResponseOffers } from "@/services/offers/types"
import type { FC } from "react"

export interface ICardSuggestion extends IResponseOffers {
    profile: {
        name: string
        userId: number
        photo: string
    }
    rating: {
        average: number
        total: number
    }
}

export type TCardSuggestion = FC<ICardSuggestion>
