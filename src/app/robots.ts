import { MetadataRoute } from "next"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import env from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"
import { getServerData } from "@/helpers/server-data"

export default async function (): Promise<MetadataRoute.Robots> {
  const [{ data }, { data: listDiscussions }, { data: listAlerts }, { data: listOffers }, { data: listPosts }] = await Promise.all([
    getOffersCategoriesPROD(),
    getServerData.discussions,
    getServerData.alerts,
    getServerData.offers,
    getServerData.posts,
  ])

  const items = (data as IResponseOffersCategories[]) || []
  const categories = items.map((_) => `/categories/${_?.id}`)
  const discussions = listDiscussions?.map((_) => `/discussions/${_?.id}`) ?? []
  const alerts = listAlerts?.map((_) => `/emergency-messages/${_?.id}`) ?? []
  const offers = listOffers?.map((_) => `/proposals/${_?.id}`) ?? []
  const posts = listPosts?.map((_) => `/list-of-posts/${_?.id}`) ?? []

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          ...categories,
          ...posts,
          ...discussions,
          ...alerts,
          ...offers,
          "/app-store",
          "/legal/ads-agreement/",
          "/legal/privacy-policy/",
          "/legal/terms/",
          "/registration",
        ],
      },
    ],
    sitemap: `${env.server.host}/sitemap.xml`,
  }
}
