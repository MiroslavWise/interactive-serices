import { useState } from "react"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import ComponentExpand from "./ComponentExpand"
import ComponentCategory from "./ComponentCategory"
import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"

interface IProps {
  posts: IPosts[]
  offers: IResponseOffers[]
  categories: IResponseOffersCategories[]
}

function ULServices({ posts, offers, categories }: IProps) {
  const [expandPosts, setExpandPosts] = useState(false)
  const [expandOffers, setExpandOffers] = useState(false)
  const [expandCategories, setExpandCategories] = useState(false)

  return (
    <section data-test="ul-search-filters" className="w-full py-2 px-5 flex flex-col overflow-y-auto overflow-x-hidden gap-2">
      <ComponentExpand is={expandOffers} on={setExpandOffers} title="Сервисы" length={offers.length} />
      <ul className={cx(expandOffers ? "flex flex-col gap-2" : "hidden", "w-full")}>
        {offers.map((item) => (
          <CardBallon key={`:s:c:x:Z:a:offer-${item.id}`} offer={item} />
        ))}
      </ul>
      <ComponentExpand is={expandPosts} on={setExpandPosts} title="Посты" length={posts.length} />
      <ul className={cx(expandPosts ? "flex flex-col gap-2" : "hidden", "w-full")}>
        {posts.map((item) => (
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
