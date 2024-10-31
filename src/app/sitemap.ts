import { type MetadataRoute } from "next"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import env from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"

export default async function (): Promise<MetadataRoute.Sitemap> {
  const [{ data }] = await Promise.all([getOffersCategoriesPROD()])
  const items = (data as IResponseOffersCategories[]) ?? []

  const categories: MetadataRoute.Sitemap = items.map((_) => ({
    url: `${env.server.host}/categories/${_.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.97,
  }))

  return [
    {
      url: `${env.server.host}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...categories,
    {
      url: `${env.server.host}/app-store`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.99,
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
  ]
}
