import {
    useBalloonCard,
    useCompletionTransaction,
    useDroverFriends,
    useHasBalloons,
    useModalAuth,
    usePopupMenuChat,
    useUpdateMutualOffer,
    useVisibleModalBarter,
    useVisiblePhotosCarousel,
    useVisibleBannerNewServices,
} from "@/store/hooks"

export const useCloseAllModal = () => {
    const { dispatch: dispatchBallonCard } = useBalloonCard()
    const { dispatchCompletion } = useCompletionTransaction()
    const { dispatchFriends } = useDroverFriends()
    const { dispatchHasBalloon } = useHasBalloons()
    const { dispatchAuthModal } = useModalAuth()
    const { setIsVisible } = usePopupMenuChat()
    const { dispatchUpdateMutual } = useUpdateMutualOffer()
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { dispatchVisibleCarousel } = useVisiblePhotosCarousel()
    const { dispatchNewServicesBanner } = useVisibleBannerNewServices()

    function close() {
        dispatchBallonCard({ visible: false })
        dispatchCompletion({ visible: false })
        dispatchFriends({ visible: false })
        dispatchHasBalloon({ visible: false })
        dispatchAuthModal({ visible: false })
        setIsVisible(false)
        dispatchUpdateMutual({ visible: false })
        dispatchVisibleBarter({ isVisible: false })
        dispatchVisibleCarousel({ visible: false })
        dispatchNewServicesBanner(false)
    }

    return close
}
