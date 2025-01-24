"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import Pagination from "@/components/common/Pagination"

import { getCompanies } from "@/services/companies"

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

  return (
    <ul className="w-full flex flex-col gap-2 h-full overflow-y-auto py-5">
      <Pagination total={total} page={page ?? 1} onChange={setPage} />
    </ul>
  )
}

export default ComponentListCompanies
