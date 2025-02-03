"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { TOrder } from "@/services/types/general"

import ItemFeedBack from "../../customer/[userId]/@feedback/components/ItemFeedBack"

import { getTestimonials } from "@/services"

function ComponentsReviews() {
  const [page] = useQueryState("page", parseAsInteger)

  const filter = {
    limit: 24,
    page: page ?? 1,
    order: "DESC" as TOrder,
  }

  const { data } = useQuery({
    queryFn: () => getTestimonials(filter),
    queryKey: ["testimonials-manager", filter],
  })

  const list = data?.data ?? []

  return (
    <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto">
      {list.map((item) => (
        <ItemFeedBack key={`manager:testimonials-${page}-${item.id}`} {...item} />
      ))}
    </ul>
  )
}

ComponentsReviews.displayName = "ComponentsReviews"
export default ComponentsReviews
