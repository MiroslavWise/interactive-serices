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
export { useAnimateLoadPageState as useAnimateLoadPage } from "../state/useAnimateLoadPageState"

export function useVisibleBannerNewServices() {
    return useVisibleBannerNewServicesState()
}

export function useVisibleAndTypeAuthModal() {
    return useVisibleAndTypeAuthModalState()
}

export const useVisibleModalBarter = useVisibleModalBarterState

export function useVisiblePhotosCarousel() {
    return useVisiblePhotosCarouselState()
}

export function useVisibleExchanges() {
    return useVisibleExchangesState()
}

export function useWelcomeModal() {
    const content = useWelcomeModalState()

    return content
}

export function usePopupMenuChat() {
    return usePopupMenuChatState()
}

export function useUpdateProfile() {
    return useUpdateProfileState()
}
