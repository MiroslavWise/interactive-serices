import { create } from "zustand"

import { IDispatch, IUseVisiblePhotosCarousel, IDispatchCurrent } from "../types/useVisiblePhotosCarousel"

export const useVisiblePhotosCarousel = create<IUseVisiblePhotosCarousel>()((set, get) => ({
  isVisible: false,
  photos: [],
  currentPhoto: null,
}))

export const setPrevPhotoCarousel = () =>
  useVisiblePhotosCarousel.setState((state) => {
    const photos = state.photos
    const currentIndex = photos.findIndex((item) => item.id === state.currentPhoto?.id) || 0
    const length = photos.length

    return currentIndex === 0 ? { ...state, currentPhoto: photos[length - 1] } : { ...state, currentPhoto: photos[currentIndex - 1] }
  })

export const setNextPhotoCarousel = () =>
  useVisiblePhotosCarousel.setState((state) => {
    const photos = state.photos
    const currentIndex = photos.findIndex((item) => item.id === state.currentPhoto?.id) || 0
    const length = photos.length

    return currentIndex === length - 1 ? { ...state, currentPhoto: photos[0] } : { ...state, currentPhoto: photos[currentIndex + 1] }
  })

export const dispatchCurrentPhoto = ({ currentPhoto }: IDispatchCurrent) => useVisiblePhotosCarousel.setState(() => ({ currentPhoto }))

export const dispatchPhotoCarousel = ({ photos, idPhoto, visible }: IDispatch) =>
  useVisiblePhotosCarousel.setState(() =>
    visible
      ? {
          isVisible: visible,
          photos: photos || [],
          currentPhoto: photos?.find((item) => item.id === idPhoto),
        }
      : {
          isVisible: visible,
          photos: [],
          currentPhoto: null,
        },
  )
