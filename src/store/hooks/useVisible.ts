import { shallow } from "zustand/shallow"

import {
    useUpdateProfileState,
    useWelcomeModalState,
    usePopupMenuChatState,
    useVisibleExchangesState,
    useVisibleModalBarterState,
    useVisiblePhotosCarouselState,
    useVisibleBannerNewServicesState,
    useVisibleAndTypeAuthModalState,
} from "../state/useVisibleState"
import { useAnimateLoadPageState } from "../state/useAnimateLoadPageState"

export function useVisibleBannerNewServices() {
    return useVisibleBannerNewServicesState(
        (state) => ({
            isVisibleNewServicesBanner: state.isVisibleNewServicesBanner,
            setIsVisibleNewServicesBanner: state.setIsVisibleNewServicesBanner,
        }),
        shallow,
    )
}

export function useVisibleAndTypeAuthModal() {
    return useVisibleAndTypeAuthModalState(
        (state) => ({
            visible: state.visible,
            type: state.type,
            setVisibleAndType: state.setVisibleAndType,
        }),
        shallow,
    )
}

export function useVisibleModalBarter() {
    return useVisibleModalBarterState(
        (state) => ({
            isVisible: state.isVisible,
            dataProfile: state.dataProfile,
            setIsVisibleBarter: state.setIsVisibleBarter,
        }),
        shallow,
    )
}

export function useVisiblePhotosCarousel() {
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

export function useVisibleExchanges() {
    return useVisibleExchangesState(
        (state) => ({
            isVisible: state.isVisible,
            type: state.type,
            setVisibleType: state.setVisibleType,
        }),
        shallow,
    )
}

export function useWelcomeModal() {
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

export function usePopupMenuChat() {
    return usePopupMenuChatState(
        (state) => ({
            isVisible: state.isVisible,
            setIsVisible: state.setIsVisible,
        }),
        shallow,
    )
}

export function useUpdateProfile() {
    return useUpdateProfileState(
        (state) => ({
            isVisible: state.isVisible,
            setVisible: state.setVisible,
        }),
        shallow,
    )
}

export function useAnimateLoadPage() {
    return useAnimateLoadPageState(
        (state) => ({
            isAnimated: state.isAnimated,
            setIsAnimated: state.setIsAnimated,
        }),
        shallow,
    )
}
