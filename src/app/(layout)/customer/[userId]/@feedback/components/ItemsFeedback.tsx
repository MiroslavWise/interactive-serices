"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import ItemFeedBack from "./ItemFeedBack"
import IconFeedBackAccent from "@/components/icons/IconFeedBackAccent"

import { getTestimonials } from "@/services"
import { useFilterSortFeedbackCustomer } from "@/store"
import { LoadingFeedback } from "@/components/common"

function ItemsFeedback({ id }: { id: string | number }) {
  const sort = useFilterSortFeedbackCustomer(({ sort }) => sort)

  const { data, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const items = data?.data || []
  const length = items.length

  const filters = useMemo(() => {
    if (sort === "default") return items

    return items.sort((a, b) => {
      if (sort === "first-negative") {
        return +a.rating - +b.rating
      } else {
        return +b.rating - +a.rating
      }
    })
  }, [sort, items])

  if (isLoading) return <LoadingFeedback />

  return (
    <section className="w-full h-fit flex flex-col flex-nowrap overflow-x-hidden overflow-y-scroll max-md:px-5">
      {length === 0 ? (
        <section className="w-full h-full flex flex-col items-center justify-center my-auto gap-2.5">
          <div className="w-14 h-14 bg-grey-field rounded-[1.75rem] p-4 flex items-center justify-center *:w-6 *:h-6">
            <IconFeedBackAccent />
          </div>
          <p className="text-text-primary text-sm font-normal">Нет отзывов</p>
        </section>
      ) : (
        filters.map((_) => <ItemFeedBack key={`::key::item::rev::${_.id}::`} {..._} />)
      )}
    </section>
  )
}

ItemsFeedback.displayName = "ItemsFeedback"
export default memo(ItemsFeedback)
