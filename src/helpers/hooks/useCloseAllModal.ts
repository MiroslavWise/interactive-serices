"use client"

import {
    usePhotoOffer,
    useProfilePublic,
    useHasBalloons,
    useBalloonCard,
    useDroverFriends,
    dispatchAuthModal,
    usePopupMenuChat,
    useVisibleModalBarter,
    useUpdateMutualOffer,
    useVisiblePhotosCarousel,
    useCompletionTransaction,
    useVisibleBannerNewServices,
} from "@/store/hooks"

export const useCloseAllModal = () => {
    const dispatchBallonCard = useBalloonCard((_) => _.dispatch)
    const dispatchCompletion = useCompletionTransaction((_) => _.dispatchCompletion)
    const dispatchFriends = useDroverFriends((_) => _.dispatchFriends)
    const dispatchHasBalloon = useHasBalloons((_) => _.dispatchHasBalloon)
    const setIsVisible = usePopupMenuChat((_) => _.setIsVisible)
    const dispatchUpdateMutual = useUpdateMutualOffer((_) => _.dispatchUpdateMutual)
    const dispatchVisibleBarter = useVisibleModalBarter((_) => _.dispatchVisibleBarter)
    const dispatchVisibleCarousel = useVisiblePhotosCarousel((_) => _.dispatchVisibleCarousel)
    const dispatchNewServicesBanner = useVisibleBannerNewServices((_) => _.dispatchNewServicesBanner)
    const dispatchPhotoOffer = usePhotoOffer((_) => _.dispatchPhotoOffer)
    const dispatchProfilePublic = useProfilePublic((_) => _.dispatchProfilePublic)

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
        dispatchPhotoOffer({ visible: false })
        dispatchProfilePublic({ visible: false })
    }

    return close
}
