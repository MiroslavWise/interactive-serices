"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import ItemFeedBack from "./ItemFeedBack"
import IconFeedBackAccent from "@/components/icons/IconFeedBackAccent"

import { getTestimonials } from "@/services"
import { useContextSortCustomer } from "./WrapperContextSort"

function ItemsFeedback({ id }: { id: string | number }) {
  const { filter } = useContextSortCustomer() ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const items = data?.res || []
  const length = items.length

  const filters = useMemo(() => {
    if (filter === "default") return items

    return items.sort((a, b) => {
      if (filter === "first-negative") {
        return +a.rating - +b.rating
      } else {
        return +b.rating - +a.rating
      }
    })
  }, [filter, items])

  if (isLoading)
    return (
      <section className="w-full flex flex-col gap-4">
        {[1, 2, 3].map((_) => (
          <div key={`::key::load::feedback::${_}::`} className="w-full flex flex-col gap-4">
            <div className="w-full h-1px bg-grey-field" />
            <div className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-[0.45rem]">
              <span className="w-full h-9 rounded-[0.625rem]" />
              <div className="w-full flex flex-col [&>span]:w-full [&>span]:h-4 [&>span]:rounded-lg gap-1">
                <span className="max-w-[11.1875rem]" />
                <span className="max-w-[6.875rem]" />
              </div>
            </div>
            <span className="w-full rounded-2xl h-[6.875rem]" />
          </div>
        ))}
      </section>
    )

  return (
    <section className="w-full h-fit flex flex-col flex-nowrap overflow-x-hidden overflow-y-scroll">
      {length === 0 ? (
        <section className="w-full flex flex-col items-center my-auto gap-0.625">
          <div className="w-14 h-14 bg-grey-field rounded-[1.75rem] p-4 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">
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
