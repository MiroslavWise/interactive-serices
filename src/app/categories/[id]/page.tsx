import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers, getOffersCategoriesPROD } from "@/services"

export default async ({ params: { id } }: { params: { id: string } }) => {
  const [{ data }, { data: dataOffers }] = await Promise.all([
    getOffersCategoriesPROD(),
    getOffers({ category: id, provider: EnumTypeProvider.offer }),
  ])
  const items = data ?? []
  const find = items.find((_) => String(_.id) === id)
  const itemsOffers = dataOffers ?? []

  return (
    <section className="w-full h-dvh md:h-screen flex flex-col gap-3 items-center justify-center py-10 overflow-y-auto pt-[var(--height-mobile-header)] md:pt-[var(--height-header-nav-bar)] pb-[var(--height-mobile-footer-nav)]">
      <h1 className="w-full text-center text-text-primary text-2xl font-semibold mb-5">Название: {find?.title}</h1>
      <p className="w-full text-center text-text-primary text-sm font-normal">Провайдер: {find?.provider}</p>
      <p className="w-full text-center text-text-primary text-sm font-normal">Слаг (ссылка): {find?.slug}</p>
      <ul className="w-full flex flex-wrap gap-1">
        {itemsOffers.map((item) => (
          <Link
            key={`:dfs:dfsA:sdf:${item.id}:`}
            href={{
              pathname: `/offer/${item.id}`,
            }}
            className="text-sm text-left font-normal text-text-primary relative py-1.5 px-4 h-9 rounded-[1.125rem] bg-btn-second-default flex flex-row items-center justify-center"
            title={item.description}
            aria-label={item.description}
            aria-labelledby={item.description}
          >
            {item.category.title} ({item.user?.firstName ?? "Имя"})
            <span className="absolute opacity-0 invisible top-1/2 left-1/2 text-xs -z-10">({item.description})</span>
          </Link>
        ))}
      </ul>
    </section>
  )
}
