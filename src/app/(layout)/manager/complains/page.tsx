"use client"

import { useQuery } from "@tanstack/react-query"

import ItemComplain from "./components/ItemComplain"

import { getComplains } from "@/services"

export default () => {
  const { data } = useQuery({
    queryFn: () => getComplains({ query: { order: "DESC" } }),
    queryKey: ["complains"],
  })

  const items = data?.data || []

  return (
    <section className="w-full pt-6 max-h-[calc(100vh_-_var(--height-header-nav-bar)] h-min -mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 px-6 items-start justify-start">
      {items.map((item) => (
        <ItemComplain key={`:key:complain:${item.id}:`} {...item} />
      ))}
    </section>
  )
}
