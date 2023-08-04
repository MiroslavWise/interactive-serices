import type { Dispatch, DispatchWithoutAction } from "react"

interface IPhoto {
  url: string
  id: number
}

export interface IUseVisiblePhotosCarousel {
  isVisible: boolean
  photos: IPhoto[]
  currentPhoto: IPhoto | null
  
  setPrev: DispatchWithoutAction
  setNext: DispatchWithoutAction
  setCurrentPhoto: Dispatch<{ currentPhoto: IPhoto }>
  setVisibleCarousel: Dispatch<{ visible: boolean, photos?: IPhoto[], idPhoto?: number }>
}