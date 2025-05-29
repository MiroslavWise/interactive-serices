import Script from "next/script"
import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import env from "@/config/environment"
import { getPostId } from "@/services/posts"
import { metadataPosts } from "@/helpers/metadata-post"
import { schemaOrgOffer } from "@/utils/schema-org"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params

  if (!id) return {}

  const { data } = await getPostId(id)

  return metadataPosts({ data: data! })
}

export default async ({ children, params: { id } }: PropsWithChildren<{ params: { id: string } }>) => {
  const { data } = await getPostId(id)

  const { title, notes = [], addresses = [] } = data ?? {}

  const address = addresses?.[0] ?? {}

  let description = ""

  for (const item of notes) {
    if (item.main) {
      description = item.description
      break
    }
  }

  const images = function () {
    const array = []

    for (const item of notes) {
      if (item?.images) {
        if (item.images?.length > 0) {
          for (const image of item.images) {
            if (array.length < 15) {
              array.push(image)
            } else {
              break
            }
          }
        }
      }
    }

    return array
  }

  const url = new URL(`${env.server.host}/post/${id}`).toString()

  const schemaOrg = schemaOrgOffer({
    url: url,
    name: title!,
    description: description!,
    images: images().map(({ attributes }) => attributes?.url!),
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
        id={`posts-notes-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaOrg,
        }}
      />
    </>
  )
}
