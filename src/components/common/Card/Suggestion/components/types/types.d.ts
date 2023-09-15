import type { FC } from "react"

export type IHeader = FC<{
  name: string
  can: string
  rating: {
    average: number
    total: number
  }
}>

export type TContainerPhotos = FC<{
  photos: {
    url: string
    id: number
  }[]
}>