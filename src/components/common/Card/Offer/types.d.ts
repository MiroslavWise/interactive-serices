import type { FC } from "react"

export interface ICardOffer{
  name: string
  photo: string
  geo: string
  date: string
  finality: boolean
  chatId?: string | number
  price: number
  rating: number
}

export type TCardOffer = FC<ICardOffer>