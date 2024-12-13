"use client"

import { useMemo } from "react"
import { useQueryState, parseAsInteger } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"
import { useQuery } from "@tanstack/react-query"
import { getOffers } from "@/services"
import { clg } from "@console"

interface IObj {
  provider?: EnumTypeProvider
  limit: number
  page: number
}

function ComponentsOffers() {
  const [type] = useQueryState("type")
  const [page] = useQueryState("page", parseAsInteger)

  const filter = useMemo(() => {
    const obj: IObj = {
      limit: 24,
      page: 1,
    }

    if (!!type) {
      if (type !== "all") {
        const providerEnum = Object.values(EnumTypeProvider)
        if (providerEnum.includes(type! as EnumTypeProvider)) {
          obj.provider = type as EnumTypeProvider
        }
      }
    }

    if (page) {
      if (Number.isFinite(page)) {
        obj.page = page
      }
    }

    return obj
  }, [type, page])

  const { data } = useQuery({
    queryFn: () => getOffers(filter),
    queryKey: ["offers-manager", filter],
  })

  const list = data?.data ?? []

  clg("list: ", list)

  return <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"></ul>
}

ComponentsOffers.displayName = "ComponentsOffers"
export default ComponentsOffers
