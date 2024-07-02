import { cache } from "react"
import { MetadataRoute } from "next"

import { getOffersCategoriesPROD } from "@/services"

const get = cache(getOffersCategoriesPROD)

import env from "@/config/environment"

export default async function (): Promise<MetadataRoute.Sitemap> {
  const { res } = await get()
  const items = res || []

  const categories: MetadataRoute.Sitemap = items.map((_) => ({
    url: `${env.server.host}/categories/${_.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.95,
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
    ...categories,
  ]
}
