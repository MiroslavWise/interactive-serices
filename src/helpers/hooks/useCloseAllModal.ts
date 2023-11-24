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
    const dispatchBallonCard = useBalloonCard((state) => state.dispatch)
    const dispatchCompletion = useCompletionTransaction(
        (state) => state.dispatchCompletion,
    )
    const dispatchFriends = useDroverFriends((state) => state.dispatchFriends)
    const dispatchHasBalloon = useHasBalloons(
        (state) => state.dispatchHasBalloon,
    )
    const dispatchAuthModal = useModalAuth((state) => state.dispatchAuthModal)
    const setIsVisible = usePopupMenuChat((state) => state.setIsVisible)
    const dispatchUpdateMutual = useUpdateMutualOffer(
        (state) => state.dispatchUpdateMutual,
    )
    const dispatchVisibleBarter = useVisibleModalBarter(
        (state) => state.dispatchVisibleBarter,
    )
    const dispatchVisibleCarousel = useVisiblePhotosCarousel(
        (state) => state.dispatchVisibleCarousel,
    )
    const dispatchNewServicesBanner = useVisibleBannerNewServices(
        (state) => state.dispatchNewServicesBanner,
    )
    const dispatchPhotoOffer = usePhotoOffer(
        (state) => state.dispatchPhotoOffer,
    )
    const dispatchProfilePublic = useProfilePublic(
        (state) => state.dispatchProfilePublic,
    )

    function close() {
        setTimeout(() => {
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
        }, 1)
    }

    return close
}
