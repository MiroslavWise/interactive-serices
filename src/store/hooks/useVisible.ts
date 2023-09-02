import { shallow } from "zustand/shallow"

import {
    usePopupMenuChatState,
    useUpdateProfileState,
    useVisibleAndTypeAuthModalState,
    useVisibleBannerNewServicesState,
    useVisibleExchangesState,
    useVisibleModalBarterState,
    useVisiblePhotosCarouselState,
    useWelcomeModalState,
} from "../state/useVisibleState"

export const useVisibleBannerNewServices = () => {
    return useVisibleBannerNewServicesState(
        (state) => ({
            isVisibleNewServicesBanner: state.isVisibleNewServicesBanner,
            setIsVisibleNewServicesBanner: state.setIsVisibleNewServicesBanner,
        }),
        shallow,
    )
}

export const useVisibleAndTypeAuthModal = () => {
    return useVisibleAndTypeAuthModalState(
        (state) => ({
            visible: state.visible,
            type: state.type,
            setVisibleAndType: state.setVisibleAndType,
        }),
        shallow,
    )
}

export const useVisibleModalBarter = () => {
    return useVisibleModalBarterState(
        (state) => ({
            isVisible: state.isVisible,
            dataProfile: state.dataProfile,
            setIsVisibleBarter: state.setIsVisibleBarter,
        }),
        shallow,
    )
}

export const useVisiblePhotosCarousel = () => {
    return useVisiblePhotosCarouselState(
        (state) => ({
            isVisible: state.isVisible,
            photos: state.photos,
            currentPhoto: state.currentPhoto,
            setPrev: state.setPrev,
            setNext: state.setNext,
            setCurrentPhoto: state.setCurrentPhoto,
            setVisibleCarousel: state.setVisibleCarousel,
        }),
        shallow,
    )
}

export const useVisibleExchanges = () => {
    return useVisibleExchangesState(
        (state) => ({
            isVisible: state.isVisible,
            type: state.type,
            setVisibleType: state.setVisibleType,
        }),
        shallow,
    )
}

export const useWelcomeModal = () => {
    const content = useWelcomeModalState(
        (state) => ({
            isVisible: state.isVisible,
            page: state.page,
            setPrev: state.setPrev,
            setNext: state.setNext,
            setPage: state.setPage,
            setVisible: state.setVisible,
        }),
        shallow,
    )

    return content
}

export const usePopupMenuChat = () => {
    return usePopupMenuChatState(
        (state) => ({
            isVisible: state.isVisible,
            setIsVisible: state.setIsVisible,
        }),
        shallow,
    )
}

export const useUpdateProfile = () => {
    return useUpdateProfileState(
        (state) => ({
            isVisible: state.isVisible,
            setVisible: state.setVisible,
        }),
        shallow,
    )
}
