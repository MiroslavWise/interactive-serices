"use client"

import {
  usePhotoOffer,
  useProfilePublic,
  useBalloonCard,
  useDroverFriends,
  usePopupMenuChat,
  useUpdateMutualOffer,
  dispatchPhotoCarousel,
  dispatchHasBalloon,
} from "@/store"

export const useCloseAllModal = () => {
  const dispatchBallonCard = useBalloonCard((_) => _.dispatch)
  const dispatchFriends = useDroverFriends((_) => _.dispatchFriends)
  const setIsVisible = usePopupMenuChat((_) => _.setIsVisible)
  const dispatchUpdateMutual = useUpdateMutualOffer((_) => _.dispatchUpdateMutual)
  const dispatchPhotoOffer = usePhotoOffer((_) => _.dispatchPhotoOffer)
  const dispatchProfilePublic = useProfilePublic((_) => _.dispatchProfilePublic)

  function close() {
    dispatchBallonCard({ visible: false })
    dispatchFriends({ visible: false })
    dispatchHasBalloon({ visibleHasBalloon: false })
    setIsVisible(false)
    dispatchUpdateMutual({ visible: false })
    dispatchPhotoCarousel({ visible: false })
    dispatchPhotoOffer({ visible: false })
    dispatchProfilePublic({ visible: false })
  }

  return close
}
