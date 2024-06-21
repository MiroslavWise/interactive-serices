import { cache } from "react"
import { MetadataRoute } from "next"

import { getOffers } from "@/services"
import env from "@/config/environment"

const getCacheOffers = cache(getOffers)

export default async function (): Promise<MetadataRoute.Robots> {
  const { res } = await getCacheOffers({ order: "DESC", limit: 50 })

  const items = res || []
  const customersLinks = Array.from(new Set(items.map((_) => _.userId)))
    .map((_) => [`/customer/${_}`, `/customer/${_}?provider=discussion`, `/customer/${_}?provider=alert`])
    .flat()

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/legal/ads-agreement/", "/legal/privacy-policy/", ...customersLinks, "/legal/terms/", "/registration"],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
