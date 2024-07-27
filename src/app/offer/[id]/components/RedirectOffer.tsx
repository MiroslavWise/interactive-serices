"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchMapCoordinates } from "@/store"

function RedirectOffer({ offer }: { offer: IResponseOffers }) {
  const { push } = useRouter()

  useEffect(() => {
    if (offer) {
      const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null
      if (geoData) {
        dispatchMapCoordinates({
          zoom: 17,
          coordinates: geoData?.coordinates?.split(" ")?.map(Number),
        })
      }

      if (offer.provider === EnumTypeProvider.offer) {
        dispatchBallonOffer({ offer: offer })
        push("/")
      }
      if (offer.provider === EnumTypeProvider.discussion) {
        dispatchBallonDiscussion({ offer: offer })
        push("/")
      }
      if (offer.provider === EnumTypeProvider.alert) {
        dispatchBallonAlert({ offer: offer })
        push("/")
      }
    }
  }, [offer])

  return null
}

RedirectOffer.displayName = "RedirectOffer"
export default RedirectOffer
