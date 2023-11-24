"use client"

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
    useProfilePublic,
    usePhotoOffer,
} from "@/store/hooks"

export const useCloseAllModal = () => {
    const dispatchBallonCard = useBalloonCard((_) => _.dispatch)
    const dispatchCompletion = useCompletionTransaction(
        (_) => _.dispatchCompletion,
    )
    const dispatchFriends = useDroverFriends((_) => _.dispatchFriends)
    const dispatchHasBalloon = useHasBalloons((_) => _.dispatchHasBalloon)
    const dispatchAuthModal = useModalAuth((_) => _.dispatchAuthModal)
    const setIsVisible = usePopupMenuChat((_) => _.setIsVisible)
    const dispatchUpdateMutual = useUpdateMutualOffer(
        (_) => _.dispatchUpdateMutual,
    )
    const dispatchVisibleBarter = useVisibleModalBarter(
        (_) => _.dispatchVisibleBarter,
    )
    const dispatchVisibleCarousel = useVisiblePhotosCarousel(
        (_) => _.dispatchVisibleCarousel,
    )
    const dispatchNewServicesBanner = useVisibleBannerNewServices(
        (_) => _.dispatchNewServicesBanner,
    )
    const dispatchPhotoOffer = usePhotoOffer((_) => _.dispatchPhotoOffer)
    const dispatchProfilePublic = useProfilePublic(
        (_) => _.dispatchProfilePublic,
    )

    function close() {
        console.log("close: ------------------- dispatchBallonCard")
        dispatchBallonCard({ visible: false })
        console.log("close: ------------------- dispatchCompletion")
        dispatchCompletion({ visible: false })
        console.log("close: ------------------- dispatchFriends")
        dispatchFriends({ visible: false })
        console.log("close: ------------------- dispatchHasBalloon")
        dispatchHasBalloon({ visible: false })
        console.log("close: ------------------- dispatchAuthModal")
        dispatchAuthModal({ visible: false })
        console.log("close: ------------------- setIsVisible")
        setIsVisible(false)
        console.log("close: ------------------- dispatchUpdateMutual")
        dispatchUpdateMutual({ visible: false })
        console.log("close: ------------------- dispatchVisibleBarter")
        dispatchVisibleBarter({ isVisible: false })
        console.log("close: ------------------- dispatchVisibleCarousel")
        dispatchVisibleCarousel({ visible: false })
        console.log("close: ------------------- dispatchNewServicesBanner")
        dispatchNewServicesBanner(false)
        console.log("close: ------------------- dispatchPhotoOffer")
        dispatchPhotoOffer({ visible: false })
        console.log("close: ------------------- dispatchProfilePublic")
        dispatchProfilePublic({ visible: false })
        console.log("close: ------------------- end")
    }

    return close
}
