"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import { usePush } from "@/helpers"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchMapCoordinates } from "@/store"

function RedirectOffer({ offer }: { offer: IResponseOffers }) {
  const { handlePush } = usePush()

  useEffect(() => {
    if (offer) {
      if (offer.provider === EnumTypeProvider.offer) {
        dispatchBallonOffer({ offer: offer })
        handlePush("/")
      }
      if (offer.provider === EnumTypeProvider.discussion) {
        dispatchBallonDiscussion({ offer: offer })
        handlePush("/")
      }
      if (offer.provider === EnumTypeProvider.alert) {
        dispatchBallonAlert({ offer: offer })
        handlePush("/")
      }

      const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null
      if (geoData) {
        dispatchMapCoordinates({
          zoom: 17,
          coordinates: geoData?.coordinates?.split(" ")?.map(Number),
        })
      }
    }
  }, [offer])

  return null
}

RedirectOffer.displayName = "RedirectOffer"
export default RedirectOffer
