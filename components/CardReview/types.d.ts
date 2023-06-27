import type { FC } from "react"

interface ICardReview{
        user: string
        date: string
        rate: number
        description: string
        images: string[]
}

export type TCardReview = FC<ICardReview>