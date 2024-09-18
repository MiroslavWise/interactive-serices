import { cache } from "react"
import { MetadataRoute } from "next"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import env from "@/config/environment"
import { getOffers, getOffersCategoriesPROD } from "@/services"

const getCacheDiscussions = cache(getOffers)
const getCacheAlerts = cache(getOffers)
const getCacheOffers = cache(getOffers)

export default async function (): Promise<MetadataRoute.Robots> {
  const [{ data }, { data: listDiscussions }, { data: listAlerts }, { data: listOffers }] = await Promise.all([
    getOffersCategoriesPROD(),
    env.server.host.includes("dev")
      ? Promise.resolve({ data: [] })
      : getCacheDiscussions({ provider: EnumTypeProvider.discussion, order: "DESC" }),
    env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCacheAlerts({ provider: EnumTypeProvider.alert, order: "DESC" }),
    env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCacheOffers({ provider: EnumTypeProvider.offer, order: "DESC" }),
  ])

  const items = (data as IResponseOffersCategories[]) || []
  const categories = items.map((_) => `/categories/${_?.id}`)
  const discussions = listDiscussions?.map((_) => `/discussions/${_?.id}`) ?? []
  const alerts = listAlerts?.map((_) => `/emergency-messages/${_?.id}`) ?? []
  const offers = listOffers?.map((_) => `/proposals/${_?.id}`) ?? []

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/app-store",
          "/legal/ads-agreement/",
          "/legal/privacy-policy/",
          "/legal/terms/",
          "/registration",
          ...categories,
          ...discussions,
          ...alerts,
          ...offers,
        ],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
