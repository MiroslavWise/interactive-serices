import { MetadataRoute } from "next"

import { getOffersCategoriesPROD } from "@/services"

import env from "@/config/environment"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

export default async function (): Promise<MetadataRoute.Robots> {
  const { data } = await getOffersCategoriesPROD()
  const items = (data as IResponseOffersCategories[]) || []

  const categories = items.map((_) => `/categories/${_.id}`)

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/app-store", "/legal/ads-agreement/", "/legal/privacy-policy/", "/legal/terms/", "/registration", ...categories],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
