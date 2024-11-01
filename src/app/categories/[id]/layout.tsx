// import { Metadata } from "next"
import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

import { keyWords } from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const { data } = await getOffersCategoriesPROD()
  const items = data ?? []

  if (items.length === 0 || !items.some((_) => _.id === Number(id))) {
    return {}
  }

  const item = items.find((_) => _.id === Number(id))

  return {
    title: item?.title,
    description: item?.title,
    keywords: [...keyWords, item?.slug ?? "", item?.provider ?? "", item?.title ?? ""],
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

export default ({ children }: PropsWithChildren) => children
