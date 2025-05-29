"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import ItemComplain from "./components/ItemComplain"
import PaginationRS from "@/components/common/PaginationRS"

import { getComplains } from "@/services"

const LIMIT = 24

export default () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data } = useQuery({
    queryFn: () => getComplains({ query: { order: "DESC", limit: LIMIT, page: page } }),
    queryKey: ["complains", { limit: LIMIT, page: page }],
  })

  const items = data?.data || []
  const total = data?.meta?.total

  return (
    <>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <ItemComplain key={`:key:complain:${item.id}:`} {...item} />
        ))}
      </ul>
      <div className="w-full flex items-center md:items-start mt-auto">
        <PaginationRS total={total} page={page} onPage={setPage} pageSize={LIMIT} />
      </div>
    </>
  )
}
