import { cache } from "react"
import { MetadataRoute } from "next"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import env from "@/config/environment"
import { getOffers, getOffersCategoriesPROD } from "@/services"

const getCacheDiscussions = cache(getOffers)
const getCacheAlerts = cache(getOffers)
const getCacheOffers = cache(getOffers)

export default async function (): Promise<MetadataRoute.Sitemap> {
  const [{ data }, { data: listDiscussions }, { data: listAlerts }, { data: listOffers }] = await Promise.all([
    getOffersCategoriesPROD(),
    env.server.host.includes("dev")
      ? Promise.resolve({ data: [] })
      : getCacheDiscussions({ provider: EnumTypeProvider.discussion, order: "DESC" }),
    env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCacheAlerts({ provider: EnumTypeProvider.alert, order: "DESC" }),
    env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCacheOffers({ provider: EnumTypeProvider.offer, order: "DESC" }),
  ])
  const items = (data as IResponseOffersCategories[]) ?? []

  const categories: MetadataRoute.Sitemap = items.map((_) => ({
    url: `${env.server.host}/categories/${_.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.95,
  }))
  const discussions: MetadataRoute.Sitemap = listDiscussions!?.map((_) => ({
    url: `${env.server.host}/discussions/${_.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.95,
  }))
  const emergencyMessages: MetadataRoute.Sitemap = listAlerts!?.map((_) => ({
    url: `${env.server.host}/emergency-messages/${_.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.95,
  }))
  const proposals: MetadataRoute.Sitemap = listOffers!?.map((_) => ({
    url: `${env.server.host}/proposals/${_.id}`,
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
    ...categories,
    ...discussions,
    ...emergencyMessages,
    ...proposals,
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
