import { useMemo, useState } from "react"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import ComponentExpand from "./ComponentExpand"
import ComponentCategory from "./ComponentCategory"
import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { useBounds } from "@/store"
import { JSONStringBounds, mapSort } from "@/utils/map-sort"

interface IProps {
  posts: IPosts[]
  offers: IResponseOffers[]
  categories: IResponseOffersCategories[]
}

function ULServices({ posts, offers, categories }: IProps) {
  const [expandPosts, setExpandPosts] = useState(false)
  const [expandOffers, setExpandOffers] = useState(false)
  const [expandCategories, setExpandCategories] = useState(false)
  const bounds = useBounds(({ bounds }) => bounds)
  const stringBounds = JSONStringBounds(bounds)

  const locationOffers = useMemo(() => (!!bounds ? mapSort({ bounds: bounds!, items: offers }) : []), [offers, stringBounds])
  const locationPosts = useMemo(() => (!!bounds ? mapSort({ bounds: bounds!, items: posts }) : []), [posts, stringBounds])

  return (
    <section data-test="ul-search-filters" className="w-full py-2 px-5 flex flex-col overflow-y-auto overflow-x-hidden gap-2">
      <ComponentExpand is={expandOffers} on={setExpandOffers} title="Активности" length={locationOffers.length} />
      <ul className={cx(expandOffers ? "flex flex-col gap-2" : "hidden", "w-full")}>
        {locationOffers.map((item) => (
          <CardBallon key={`:s:c:x:Z:a:offer-${item.id}`} offer={item} />
        ))}
      </ul>
      <ComponentExpand is={expandPosts} on={setExpandPosts} title="Посты" length={locationPosts.length} />
      <ul className={cx(expandPosts ? "flex flex-col gap-2" : "hidden", "w-full")}>
        {locationPosts.map((item) => (
          <CardPost key={`:s:d:f:G:post-${item.id}`} post={item} />
        ))}
      </ul>
      <ComponentExpand is={expandCategories} on={setExpandCategories} title="Категории" length={categories.length} />
      <ul className={cx(expandCategories ? "grid grid-cols-3 gap-5" : "hidden", "w-full")}>
        {categories.map((item) => (
          <ComponentCategory key={`:d:n:k:g:t-${item.id}:`} category={item} />
        ))}
      </ul>
    </section>
  )
}

export default ULServices
