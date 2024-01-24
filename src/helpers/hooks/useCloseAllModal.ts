"use client"

import {
    usePhotoOffer,
    useProfilePublic,
    useBalloonCard,
    useDroverFriends,
    // dispatchAuthModal,
    usePopupMenuChat,
    useUpdateMutualOffer,
    dispatchPhotoCarousel,
    // useCompletionTransaction,
    useVisibleBannerNewServices,
    dispatchHasBalloon,
    // dispatchReciprocalExchange,
} from "@/store"

export const useCloseAllModal = () => {
    const dispatchBallonCard = useBalloonCard((_) => _.dispatch)
    // const dispatchCompletion = useCompletionTransaction((_) => _.dispatchCompletion)
    const dispatchFriends = useDroverFriends((_) => _.dispatchFriends)
    const setIsVisible = usePopupMenuChat((_) => _.setIsVisible)
    const dispatchUpdateMutual = useUpdateMutualOffer((_) => _.dispatchUpdateMutual)
    const dispatchNewServicesBanner = useVisibleBannerNewServices((_) => _.dispatchNewServicesBanner)
    const dispatchPhotoOffer = usePhotoOffer((_) => _.dispatchPhotoOffer)
    const dispatchProfilePublic = useProfilePublic((_) => _.dispatchProfilePublic)

    function close() {
        dispatchBallonCard({ visible: false })
        /* dispatchCompletion({ visible: false }) */
        dispatchFriends({ visible: false })
        dispatchHasBalloon({ visibleHasBalloon: false })
        // dispatchAuthModal({ visible: false })
        setIsVisible(false)
        dispatchUpdateMutual({ visible: false })
        dispatchPhotoCarousel({ visible: false })
        dispatchNewServicesBanner(false)
        dispatchPhotoOffer({ visible: false })
        dispatchProfilePublic({ visible: false })
        // dispatchReciprocalExchange({ visible: false })
    }

    return close
}
