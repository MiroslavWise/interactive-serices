import { type Metadata } from "next"
import { type ReactNode } from "react"

import { EnumTypeProvider } from "@/types/enum"

import env from "@/config/environment"
import { getIdOffer } from "@/services"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}
  const { data: offer } = await getIdOffer(Number(id))

  const obj: Metadata = {}

  if (!!offer) {
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
        images: offer.images ? offer.images.map((_) => _.attributes.url) : undefined,
      }
      obj.twitter = {
        images: offer.images ? offer.images.map((_) => _.attributes.url) : undefined,
      }
    }
  }

  return obj
}

export default ({ children }: { children: ReactNode }) => children
