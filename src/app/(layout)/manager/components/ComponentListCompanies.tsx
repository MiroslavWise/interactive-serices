"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { getCompanies } from "@/services/companies"
import { clg } from "@console"
import Pagination from "@/components/common/Pagination"

const LIMIT = 10

function filter(page: number) {
  const obj = {
    limit: LIMIT,
    page: 1,
  }

  if (page) {
    obj.page = page
  }

  return obj
}

function ComponentListCompanies() {
  const [page, setPage] = useQueryState("page", parseAsInteger)

  const f = filter(page ?? 1)

  const { data } = useQuery({
    queryFn: () => getCompanies(f),
    queryKey: ["companies", f],
  })

  const total = data?.meta?.total

  clg("data: ", data)

  return (
    <ul className="w-full flex flex-col gap-2 h-full overflow-y-auto">
      <Pagination total={total} page={page ?? 1} onChange={setPage} />
    </ul>
  )
}

export default ComponentListCompanies
