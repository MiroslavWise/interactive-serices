import { redirect } from "next/navigation"

import { type IParamsRouteOffers } from "./layout"

import RedirectOffer from "./components/RedirectOffer"

import { getIdOffer } from "@/services"

export default async ({ params }: IParamsRouteOffers) => {
  const { offerId } = params ?? {}

  const { data: offer } = await getIdOffer(offerId)

  if (offer) {
    return <RedirectOffer offer={offer} />
  } else {
    return redirect("/")
  }
}
