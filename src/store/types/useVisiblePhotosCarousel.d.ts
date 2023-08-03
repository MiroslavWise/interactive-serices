import type { Dispatch } from "react"

interface IPhoto {
  url: string
  id: number
}

export interface IUseVisiblePhotosCarousel {
  isVisible: boolean
  photos: IPhoto[]
  currentPhoto: IPhoto | null

  setCurrentPhoto: Dispatch<{ currentPhoto: IPhoto }>
  setVisibleCarousel: Dispatch<{ visible: boolean, photos?: IPhoto[], idPhoto?: number }>
}