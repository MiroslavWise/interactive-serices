import type { FC } from "react"
import type { TTypeProvider } from "@/services/file-upload/types"

export type IHeader = FC<{
    categoryId: number
    rating: {
        average: number
        total: number
    }
    title: string
    provider: TTypeProvider
}>

export type TContainerPhotos = FC<{
    photos: {
        url: string
        id: number
    }[]
}>
