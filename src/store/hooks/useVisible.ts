import { shallow } from "zustand/shallow"

import {
  usePopupMenuChatState,
  useVisibleAndTypeAuthModalState,
  useVisibleBannerNewServicesState,
  useVisibleExchangesState,
  useVisibleModalBarterState,
  useVisiblePhotosCarouselState,
  useWelcomeModalState,
} from "../state/useVisibleState"

export const useVisibleBannerNewServices = () => {
  const content = useVisibleBannerNewServicesState(state => ({
    isVisibleNewServicesBanner: state.isVisibleNewServicesBanner,
    setIsVisibleNewServicesBanner: state.setIsVisibleNewServicesBanner,
  }), shallow)
  return content
}

export const useVisibleAndTypeAuthModal = () => {
  const content = useVisibleAndTypeAuthModalState(state => ({
    visible: state.visible,
    type: state.type,
    setVisibleAndType: state.setVisibleAndType,
  }), shallow)
  return content
}

export const useVisibleModalBarter = () => {
  const content = useVisibleModalBarterState(state => ({
    isVisible: state.isVisible,
    dataProfile: state.dataProfile,
    setIsVisibleBarter: state.setIsVisibleBarter,
  }), shallow)
  return content
}

export const useVisiblePhotosCarousel = () => {
  const content = useVisiblePhotosCarouselState(state => ({
    isVisible: state.isVisible,
    photos: state.photos,
    currentPhoto: state.currentPhoto,
    setPrev: state.setPrev,
    setNext: state.setNext,
    setCurrentPhoto: state.setCurrentPhoto,
    setVisibleCarousel: state.setVisibleCarousel,
  }), shallow)
  return content
}

export const useVisibleExchanges = () => {
  const content = useVisibleExchangesState(state => ({
    isVisible: state.isVisible,
    type: state.type,
    setVisibleType: state.setVisibleType,
  }), shallow)
  return content
}

export const useWelcomeModal = () => {
  const content = useWelcomeModalState(state => ({
    isVisible: state.isVisible,
    page: state.page,
    setPrev: state.setPrev,
    setNext: state.setNext,
    setPage: state.setPage,
    setVisible: state.setVisible,
  }), shallow)

  return content
}

export const usePopupMenuChat = () => {
  return usePopupMenuChatState(state => ({
    isVisible: state.isVisible,
    setIsVisible: state.setIsVisible,
  }), shallow)
}