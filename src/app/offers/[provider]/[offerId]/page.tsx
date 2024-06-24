import { cache } from "react"
import { redirect } from "next/navigation"

import { type IParamsRouteOffers } from "./layout"

import RedirectOffer from "./components/RedirectOffer"

import { getIdOffer } from "@/services"

const getCacheOfferId = cache(getIdOffer)

export default async ({ params }: IParamsRouteOffers) => {
  const { offerId } = params ?? {}

  const { res: offer } = await getCacheOfferId(offerId)

  if (offer) {
    return <RedirectOffer offer={offer} />
  } else {
    return redirect("/")
  }
}
