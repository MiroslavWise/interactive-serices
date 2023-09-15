import type { FC } from "react"

export interface ICardSuggestion{
  name: string
  can: string
  want?: any
  photos: {
    url: string
    id: number
  }[]
  rating: {
    average: number
    total: number
  }
}

export type TCardSuggestion = FC<ICardSuggestion>