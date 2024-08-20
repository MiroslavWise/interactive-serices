// import { Metadata } from "next"
import { type Metadata } from "next"
import { type ReactNode } from "react"

import { getOffersCategoriesPROD } from "@/services"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await getOffersCategoriesPROD()
  const { id } = params ?? {}
  const items = (data as IResponseOffersCategories[]) || []

  if (items.length === 0 || !items.some((_) => _.id === Number(id))) {
    return {}
  }

  const item = items.find((_) => _.id === Number(id))

  return {
    title: item?.title,
    description: item?.title,
    keywords: [item?.slug || "", item?.provider || ""],
    openGraph: {
      title: item?.title,
    },
    twitter: {
      title: item?.title,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default ({ children }: { children: ReactNode }) => children
