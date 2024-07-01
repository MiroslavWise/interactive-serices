"use client"

import { useQuery } from "@tanstack/react-query"

import ButtonSort from "./ButtonSort"

import { getTestimonials } from "@/services"

function TotalAndFilterFeedback({ id }: { id: number | string }) {
  const { data, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const items = data?.res || []
  const length = items.length

  if (isLoading) return <span className="w-full h-5 rounded-[0.625rem]" />
  if (!length) return null

  return (
    <article className="w-full py-0.625 flex items-center justify-between gap-5 border-t-[1px] border-b-[1px] border-solid border-grey-stroke-light">
      <p className="text-text-primary text-sm font-medium">{items.length || 0} отзывов</p>
      <ButtonSort />
    </article>
  )
}

TotalAndFilterFeedback.displayName = "TotalAndFilterFeedback"
export default TotalAndFilterFeedback
