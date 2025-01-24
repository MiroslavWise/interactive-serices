"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import ItemOfListCompany from "./ItemOfListCompany"
import LoadingCompanyList from "./LoadingCompanyList"
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

  const { data, isLoading } = useQuery({
    queryFn: () => getCompanies(f),
    queryKey: ["companies", f],
  })

  const list = data?.data ?? []
  const total = data?.meta?.total

  return (
    <ul className="w-full flex flex-col h-full overflow-y-auto py-5">
      {isLoading
        ? [1, 2, 34, 5, 6, 7, 8, 9, 3, 19].map((_) => <LoadingCompanyList key={`:f.v-d;f;'e=-${_}:`} />)
        : list.map((company) => <ItemOfListCompany key={`.s/df.s,d-${company.id}`} {...company} />)}
      <div className="w-full p-1" />
      <Pagination total={total} page={page ?? 1} onChange={setPage} />
    </ul>
  )
}

export default ComponentListCompanies
