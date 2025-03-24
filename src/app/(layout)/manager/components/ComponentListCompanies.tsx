"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"

import ItemOfListCompany from "./ItemOfListCompany"
import LoadingCompanyList from "./LoadingCompanyList"
import Pagination from "@/components/common/Pagination"

import { useDebounce } from "@/helpers"
import { getCompanies, QCompanies } from "@/services/companies"

const LIMIT = 10

function filter(page: number, search: string | null) {
  const obj: QCompanies = {
    limit: LIMIT,
    page: 1,
  }

  if (page) {
    obj.page = page
  }

  if (search && search.length > 0) {
    obj.search = search
  }

  return obj
}

function ComponentListCompanies() {
  const [page, setPage] = useQueryState("page", parseAsInteger)
  const [search, setSearch] = useQueryState("search", parseAsString)
  const [input, setInput] = useState(search || "")
  const debouncedValue = useDebounce(on, 1250)

  function on() {
    const trim = input.trim().toLowerCase()
    if (trim.length > 0) {
      setSearch(trim)
    } else {
      setSearch(null)
    }
  }

  const f = filter(page ?? 1, search)

  const { data, isLoading } = useQuery({
    queryFn: () => getCompanies(f),
    queryKey: ["companies", f],
  })

  const list = data?.data ?? []
  const total = data?.meta?.total

  return (
    <ul className="w-full flex flex-col h-full overflow-y-auto py-5">
      <div className="w-full mb-2">
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
            debouncedValue()
          }}
          placeholder="Введите для поиска компании (не менее 2-х символов)"
        />
      </div>
      {isLoading
        ? [1, 2, 34, 5, 6, 7, 8, 9, 3, 19].map((_) => <LoadingCompanyList key={`:f.v-d;f;'e=-${_}:`} />)
        : list.map((company) => <ItemOfListCompany key={`.s/df.s,d-${company.id}`} {...company} />)}
      <div className="w-full p-1" />
      <Pagination total={total} page={page ?? 1} onChange={setPage} />
    </ul>
  )
}

export default ComponentListCompanies
