import { type Metadata } from "next"
import { type ReactNode, cache } from "react"

import { EnumTypeProvider } from "@/types/enum"

import env from "@/config/environment"
import { getIdOffer } from "@/services"

const getCacheOfferId = cache(getIdOffer)

export interface IParamsRouteOffers {
  params: {
    provider: EnumTypeProvider
    offerId: string | number
  }
}

export async function generateMetadata({ params }: IParamsRouteOffers): Promise<Metadata> {
  const offerId = params?.offerId

  const { data: offer } = await getCacheOfferId(offerId)

  const obj: Metadata = {}

  if (offer) {
    if (offer.provider === EnumTypeProvider.offer) {
      obj.title = offer?.category?.title
    } else {
      obj.title = offer.title
    }
    obj.description = offer.description

    if (offer?.images?.length) {
      obj.openGraph = {
        type: "website",
        locale: "ru",
        url: `${env.server.host}/offers/${offer.provider}/${offer.id}`,
        images: offer.images[0]?.attributes?.url!,
      }
      obj.twitter = {
        images: offer.images[0]?.attributes?.url!,
      }
    }
  }

  return obj
}

export default ({ children }: { children: ReactNode }) => children
