import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { getIdOffer } from "@/services"
import { metadataOffers } from "@/helpers/metadata-offers"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params ?? {}
  if (!id) return {}
  const { data } = await getIdOffer(Number(id))

  return metadataOffers({ data: data! })
}

export default ({ children }: PropsWithChildren) => children
