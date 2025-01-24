"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { getCompanies } from "@/services/companies"
import { clg } from "@console"

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
  const [page] = useQueryState("page", parseAsInteger)

  const f = filter(page ?? 1)

  const { data } = useQuery({
    queryFn: () => getCompanies(f),
    queryKey: ["companies", f],
  })

  clg("data: ", data)

  return <ul className="w-full flex flex-col gap-2 h-full overflow-y-auto"></ul>
}

export default ComponentListCompanies
