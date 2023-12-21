import type { FC } from "react"
import type { TTypeProvider } from "@/services/file-upload/types"
import type { IResponseOffers } from "@/services/offers/types"

export type IHeader = FC<{
    rating: {
        average: number
        total: number
    } | null
    data: IResponseOffers
}>

export type TContainerPhotos = FC<{
    photos: {
        url: string
        id: number
    }[]
}>
