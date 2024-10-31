import Link from "next/link"
import { type Metadata } from "next"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { keyWords } from "@/config/environment"
import { getOffersCategoriesPROD } from "@/services"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"

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

  const items = data ?? []

  return (
    <div className="w-full h-dvh md:h-screen flex flex-col gap-6 pt-[var(--height-mobile-header)] md:pt-[var(--height-header-nav-bar)] pb-[var(--height-mobile-footer-nav)] overflow-x-hidden overflow-y-auto">
      <h3 className="text-center text-xl font-semibold text-text-primary mt-2">
        Все категории и услуги, предоставляемые приложением и сайтом{" "}
        <Link href={{ pathname: "https://sheira.ru" }} target="_blank" prefetch={false}>
          sheira.ru
        </Link>
        , а также - обсуждения и SOS-сообщения
      </h3>
      <ul className="w-full flex flex-wrap gap-2 mb-2">
        {items.map((item) => (
          <li
            key={`::key::${item.id}-${item.slug}`}
            className="relative py-1.5 px-4 h-9 rounded-[1.125rem] bg-btn-second-default flex flex-row items-center justify-center"
          >
            <Link
              href={{ pathname: `/categories/${item.id}` }}
              className={cx("text-sm text-left font-normal text-text-primary", styles.link)}
              title={item.title}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
