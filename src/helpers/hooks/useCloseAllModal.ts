"use client"

import { usePhotoOffer, useBalloonCard, useDroverFriends, usePopupMenuChat, dispatchPhotoCarousel, dispatchHasBalloon } from "@/store"

export const useCloseAllModal = () => {
  const dispatchBallonCard = useBalloonCard((_) => _.dispatch)
  const dispatchFriends = useDroverFriends((_) => _.dispatchFriends)
  const setIsVisible = usePopupMenuChat((_) => _.setIsVisible)
  const dispatchPhotoOffer = usePhotoOffer((_) => _.dispatchPhotoOffer)

  function close() {
    dispatchBallonCard({ visible: false })
    dispatchFriends({ visible: false })
    dispatchHasBalloon({ visibleHasBalloon: false })
    setIsVisible(false)
    dispatchPhotoCarousel({ visible: false })
    dispatchPhotoOffer({ visible: false })
  }

  return close
}
