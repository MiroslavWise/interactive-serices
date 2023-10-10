import type { FC } from "react"

export type IHeader = FC<{
    categoryId: number
    rating: {
        average: number
        total: number
    }
    title: string
}>

export type TContainerPhotos = FC<{
    photos: {
        url: string
        id: number
    }[]
}>
