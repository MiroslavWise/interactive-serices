import type { FC } from "react"

export interface IPlacemarkCurrent{
  name: string
  about: string
  image: {
    url: string
  }
  icon: string
  coordinates: [number, number]
  size: [number, number]
  id: string | number
  userId: number | string
}

export type TPlacemarkCurrent = FC<IPlacemarkCurrent>