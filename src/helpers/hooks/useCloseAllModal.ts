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
} from "@/store/hooks"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"
import { useProfilePublic } from "@/store/state/useProfilePublic"

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
    const { dispatchPhotoOffer } = usePhotoOffer()
    const { dispatchProfilePublic } = useProfilePublic()

    function close() {
        console.log("close: ---------------------------------------")
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
        dispatchPhotoOffer({ visible: false, photos: null })
        dispatchProfilePublic({visible: false})
    }

    return close
}
