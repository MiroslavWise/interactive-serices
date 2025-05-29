import Script from "next/script"
import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import env from "@/config/environment"
import { getIdOffer } from "@/services"
import { schemaOrgOffer } from "@/utils/schema-org"
import { metadataOffers } from "@/helpers/metadata-offers"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  if (!id) return {}
  const { data } = await getIdOffer(Number(id))

  return metadataOffers({ data: data! })
}

export default async ({ children, params: { id } }: PropsWithChildren<{ params: { id: string } }>) => {
  const { data } = await getIdOffer(Number(id))

  const { title, description, slug, images = [], addresses = [], provider } = data ?? {}

  const address = addresses?.[0] ?? {}

  const url = new URL(`${env.server.host}/offer/${id}`).toString()

  const schemaOrg = schemaOrgOffer({
    url: url,
    name: title!,
    description: description!,
    images: images.map(({ attributes }) => attributes?.url!),
    address: {
      streetAddress: address?.additional,
      addressLocality: address.city,
      addressRegion: address?.district,
      postalCode: address?.zip ? String(address.zip) : undefined,
      addressCountry: address?.country,
    },
  })

  return (
    <>
      {children}
      <Script
        id={`offer-${provider}-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaOrg,
        }}
      />
    </>
  )
}
