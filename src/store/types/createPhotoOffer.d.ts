import { Dispatch } from "react"

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
}

export interface IUsePhotoOffer {
    current?: IPhoto
    photos: IPhoto[]
    visible: boolean
    author?: IAuthor

    dispatch: Dispatch<IActionPhoto>
}
