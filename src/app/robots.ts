import { cache } from "react"
import { MetadataRoute } from "next"

import { getOffersCategoriesPROD } from "@/services"

const get = cache(getOffersCategoriesPROD)

import env from "@/config/environment"

export default async function (): Promise<MetadataRoute.Robots> {
  const { res } = await get()
  const items = res || []

  const categories = items.map((_) => `/categories/${_.id}`)

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/legal/ads-agreement/", "/legal/privacy-policy/", "/legal/terms/", "/registration", ...categories],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
