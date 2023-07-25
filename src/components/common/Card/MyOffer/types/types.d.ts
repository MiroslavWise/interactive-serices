import type { FC } from "react"

export interface IMyOffer{
  name: string
  verification: boolean
  rating: number
  reviews_total: number
  can: string
  wish: string[]
  photos: string[]
  
}

export type TMyOffer = FC<IMyOffer>