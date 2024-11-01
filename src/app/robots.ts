import { MetadataRoute } from "next"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import env from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"

export default async function (): Promise<MetadataRoute.Robots> {
  const { data } = await getOffersCategoriesPROD()

  const items = (data as IResponseOffersCategories[]) || []
  const categories = items.map((_) => `/categories/${_?.id}`)

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...categories, "/app-store", "/legal/ads-agreement/", "/legal/privacy-policy/", "/legal/terms/", "/registration"],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
