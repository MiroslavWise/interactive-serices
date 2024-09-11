import Link from "next/link"
import { type Metadata } from "next"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { keyWords } from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getOffersCategoriesPROD()
  const items = (data as IResponseOffersCategories[]) || []

  if (items.length === 0) {
    return {}
  }

  const title = "Категории и услуги, обсуждения и SOS-сообщения"

  return {
    title: title,
    description: `${items.map((item) => item.title).join(", ")}`,
    keywords: [...keyWords, ...items.map((item) => item.title)],
    openGraph: {
      title: title,
    },
    twitter: {
      title: title,
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

export default async () => {
  const { data } = await getOffersCategoriesPROD()

  const items = (data as IResponseOffersCategories[]) || []

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h3 className="text-center text-xl font-semibold text-text-primary">
        Все категории и услуги, предоставляемые приложением и сайтом{" "}
        <Link href={{ pathname: "https://sheira.ru" }} target="_blank" prefetch={false}>
          sheira.ru
        </Link>
        , а также - обсуждения и SOS-сообщения
        <ul className="w-full flex flex-col gap-2">
          {items.map((item) => (
            <li key={`::key::${item.id}-${item.slug}`} className="w-full">
              <Link
                href={{ pathname: `/categories/${item.id}` }}
                className="text-sm text-left font-normal text-text-primary"
                title={item.title}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </h3>
    </div>
  )
}
