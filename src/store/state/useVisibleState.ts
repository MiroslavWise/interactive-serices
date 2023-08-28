import { create } from "zustand"

import type { IUseVisibleBannerNewServicesState } from "../types/useVisibleBannerNewServicesState"
import type { IUseVisibleAndTypeAuthModalState } from "../types/useVisibleAndTypeAuthModalState"
import type { IUseVisibleModalBarter } from "../types/useVisibleModalBarter"
import type { IUseVisiblePhotosCarousel } from "../types/useVisiblePhotosCarousel"
import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"
import type { IUseWelcomeModal } from "../types/useWelcomeModal"
import type { IUsePopupMenuChat } from "../types/usePopupMenuChat"



export const useVisibleBannerNewServicesState = create<IUseVisibleBannerNewServicesState>(
  (set, get) => ({
    isVisibleNewServicesBanner: false,
    setIsVisibleNewServicesBanner(value) {
      set({
        isVisibleNewServicesBanner: value,
      })
    },
  })
)

export const useVisibleAndTypeAuthModalState = create<IUseVisibleAndTypeAuthModalState>(
  (set, get) => ({
    visible: false,
    type: null,
    setVisibleAndType({ visible, type }) {
      set({
        visible: typeof visible !== "undefined" ? visible : get().visible,
        type: typeof type !== "undefined" ? type : get().type,
      })
    },
  })
)

export const useVisibleModalBarterState = create<IUseVisibleModalBarter>(
  (set, get) => ({
    isVisible: false,
    dataProfile: undefined,

    setIsVisibleBarter({ isVisible, dataProfile }) {
      set({
        isVisible: isVisible,
      })
      if (dataProfile !== undefined) {
        set({
          dataProfile: dataProfile,
        })
      } else {
        setTimeout(() => {
          set({
            dataProfile: undefined,
          })
        }, 350)
      }
    },
  })
)

export const useVisibleExchangesState = create<IUseVisibleExchanges>(
  (set, get) => ({
    isVisible: false,
    type: undefined,

    setVisibleType({ visible, type }) {
      set({
        isVisible: typeof visible !== "undefined" ? visible : get().isVisible,
        type: typeof type !== "undefined" ? type : get().type,
      })
    }
  })
)

export const useVisiblePhotosCarouselState = create<IUseVisiblePhotosCarousel>(
  (set, get) => ({
    isVisible: false,
    photos: [],
    currentPhoto: null,
    setPrev() {
      const currentIndex = get().photos.findIndex(item => item.id === get().currentPhoto?.id) || 0
      const length = get().photos.length

      if (currentIndex === 0) {
        get().setCurrentPhoto({ currentPhoto: get().photos[length - 1] })
      } else {
        get().setCurrentPhoto({ currentPhoto: get().photos[currentIndex - 1] })
      }
    },
    setNext() {
      const currentIndex = get().photos.findIndex(item => item.id === get().currentPhoto?.id) || 0
      const length = get().photos.length

      if (currentIndex === length - 1) {
        get().setCurrentPhoto({ currentPhoto: get().photos[0] })
      } else {
        get().setCurrentPhoto({ currentPhoto: get().photos[currentIndex + 1] })
      }
    },
    setCurrentPhoto({ currentPhoto }) {
      set({
        currentPhoto: currentPhoto,
      })
    },
    setVisibleCarousel({ photos, idPhoto, visible }) {
      set({
        isVisible: visible,
      })
      if (visible && photos) {
        set({
          photos: photos || [],
          currentPhoto: photos?.find(item => item.id === idPhoto),
        })
      } else {
        setTimeout(() => {
          set({
            photos: [],
            currentPhoto: null,
          })
        }, 300)
      }
    },
  })
)

export const useWelcomeModalState = create<IUseWelcomeModal>(
  (set, get) => ({
    isVisible: false,
    page: 1,

    setPrev() { if (get().page > 1) set({ page: get().page - 1 }) },
    setNext() { if (get().page < 4) set({ page: get().page + 1 }) },
    setPage(value) { if (value !== get().page) { set({ page: value }) } },
    setVisible(value) { set({ isVisible: value }) },
  })
)

export const usePopupMenuChatState = create<IUsePopupMenuChat>(
  (set, get) => ({
    isVisible: false,

    setIsVisible(value) { set({ isVisible: typeof value === "undefined" ? !get().isVisible : value }) },
  })
)