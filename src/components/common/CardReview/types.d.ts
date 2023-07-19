import type { FC } from "react"

export interface ICardReview {
  user: string
  date: string
  rate: number
  description: string
  images: string[]
  classNames?: string[]
}

export type TCardReview = FC<ICardReview>