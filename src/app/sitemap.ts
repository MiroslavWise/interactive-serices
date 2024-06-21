import { cache } from "react"
import { MetadataRoute } from "next"

import env from "@/config/environment"
import { getOffers } from "@/services"

const getCacheOffers = cache(getOffers)

export default async function (): Promise<MetadataRoute.Sitemap> {
  const { res } = await getCacheOffers({ order: "DESC", limit: 50 })

  const items = res || []

  const customers = Array.from(new Set(items.map((_) => _.userId)))

  const customersMap: MetadataRoute.Sitemap = customers.map((item) => ({
    url: `${env.server.host}/customer/${item}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  return [
    {
      url: `${env.server.host}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${env.server.host}/legal/ads-agreement/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${env.server.host}/legal/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${env.server.host}/legal/terms/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${env.server.host}/registration`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...customersMap,
  ]
}
