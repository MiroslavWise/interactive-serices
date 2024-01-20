import type { Dispatch, DispatchWithoutAction } from "react"

interface IPhoto {
    url: string
    id: number
}

export interface IDispatch {
    visible: boolean
    photos?: IPhoto[]
    idPhoto?: number
}

export interface IDispatchCurrent {
    currentPhoto: IPhoto
}

export interface IUseVisiblePhotosCarousel {
    isVisible: boolean
    photos: IPhoto[]
    currentPhoto: IPhoto | null
}
