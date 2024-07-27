import { type Metadata } from "next"
import { type ReactNode } from "react"

import { EnumTypeProvider } from "@/types/enum"

import env from "@/config/environment"
import { getIdOffer } from "@/services"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}
  const { data: offer } = await getIdOffer(id)

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
        url: `${env.server.host}/offer/${id}/${String(offer.slug).replaceAll("/", "-")}`,
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
