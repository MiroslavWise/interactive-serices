import type { Dispatch } from "react"
import type { TTypeProvider } from "@/services/file-upload/types"
import { IResponseOffers } from "@/services/offers/types"

interface IPhoto {
    id: number
    url: string
    index: number
}

interface IAuthor {
    idUser: number
    name: string
    urlPhoto: string
    time: Date | string
    title: string
}

type TPayloadNextPrev = "prev" | "next"

export interface IActionPhoto {
    current?: IPhoto | null
    photos?: IPhoto[] | null
    payload?: TPayloadNextPrev
    visible?: boolean
    author?: IAuthor
    offer?: IResponseOffers
}

export interface IUsePhotoOffer {
    current?: IPhoto
    offer: IResponseOffers | undefined
    photos: IPhoto[]
    visible: boolean
    author?: IAuthor

    dispatchPhotoOffer: Dispatch<IActionPhoto>
}
