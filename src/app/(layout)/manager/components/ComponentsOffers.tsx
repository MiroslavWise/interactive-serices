"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryState, parseAsInteger, parseAsStringEnum } from "nuqs"

import CardPost from "@/components/common/Card/CardPost"
import PaginationRS from "@/components/common/PaginationRS"
import CardBallon from "@/components/common/Card/CardBallon"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers } from "@/services"
import { getPosts } from "@/services/posts"
import { EOrder } from "@/services/types/general"
import { IQueriesOffers } from "@/services/offers/types"

const LIMIT = 24

function ComponentsOffers() {
  const [type] = useQueryState(
    "type",
    parseAsStringEnum<EnumTypeProvider>(Object.values(EnumTypeProvider)).withDefault(EnumTypeProvider.offer),
  )
  const [order] = useQueryState("sort", parseAsStringEnum<EOrder>(Object.values(EOrder)).withDefault(EOrder.DESC))
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const filter = useMemo(() => {
    const obj: IQueriesOffers = {
      limit: LIMIT,
      page: page,
      order: order,
    }

    if (!!type && [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type)) {
      const providerEnum = Object.values(EnumTypeProvider)
      if (providerEnum.includes(type! as EnumTypeProvider)) {
        obj.provider = type as EnumTypeProvider
      }
    }

    return obj
  }, [type, page, order])

  const { data } = useQuery({
    queryFn: () => getOffers(filter),
    queryKey: ["offers-manager", filter],
    enabled: [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type),
  })

  const { data: dataPosts } = useQuery({
    queryFn: () => getPosts(filter),
    queryKey: ["posts-manager", filter],
    enabled: type === EnumTypeProvider.POST,
  })

  const list = data?.data ?? []
  const total = data?.meta?.total
  const listPosts = dataPosts?.data ?? []
  const totalPosts = dataPosts?.meta?.total

  if ([EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type))
    return (
      <>
        <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto">
          {list.map((item) => (
            <CardBallon key={`manager:offer-${page}-${item.id}`} offer={item} />
          ))}
        </ul>
        <div className="w-full flex items-center md:items-start mt-auto">
          <PaginationRS total={total} page={page} onPage={setPage} pageSize={LIMIT} />
        </div>
      </>
    )
  if (type === EnumTypeProvider.POST)
    return (
      <>
        <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto">
          {listPosts.map((item) => (
            <CardPost key={`manager:posts-${page}-${item.id}`} post={item} />
          ))}
        </ul>
        <div className="w-full flex items-center md:items-start mt-auto">
          <PaginationRS total={totalPosts} page={page} onPage={setPage} pageSize={LIMIT} />
        </div>
      </>
    )

  return null
}

ComponentsOffers.displayName = "ComponentsOffers"
export default ComponentsOffers
