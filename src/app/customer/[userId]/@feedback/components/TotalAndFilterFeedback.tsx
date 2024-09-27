"use client"

import { useQuery } from "@tanstack/react-query"

import ButtonSort from "./ButtonSort"

import { getTestimonials } from "@/services"
import { DeclensionAllQuantityFeedback } from "@/lib/declension"

function TotalAndFilterFeedback({ id }: { id: number | string }) {
  const { data, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const items = data?.data || []
  const length = items.length
  const name = DeclensionAllQuantityFeedback(length)

  if (isLoading) return <span className="w-full h-5 rounded-.625" />
  if (!length) return null

  return (
    <article className="w-full py-5 md:py-2.5 flex items-center justify-between gap-5 md:border-t border-b border-solid border-grey-stroke-light max-md:mx-5 max-md:max-w-[calc(100%_-_2.5rem)]">
      <p className="text-text-primary text-sm font-medium">{name}</p>
      <ButtonSort />
    </article>
  )
}

TotalAndFilterFeedback.displayName = "TotalAndFilterFeedback"
export default TotalAndFilterFeedback
