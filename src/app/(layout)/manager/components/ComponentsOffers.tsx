"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryState, parseAsInteger, parseAsStringEnum } from "nuqs"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { EnumTypeProvider } from "@/types/enum"

import { getOffers } from "@/services"
import { getPosts } from "@/services/posts"

interface IObj {
  provider?: EnumTypeProvider
  limit: number
  page: number
}

function ComponentsOffers() {
  const [type] = useQueryState(
    "type",
    parseAsStringEnum<EnumTypeProvider>(Object.values(EnumTypeProvider)).withDefault(EnumTypeProvider.offer),
  )
  const [page] = useQueryState("page", parseAsInteger)

  const filter = useMemo(() => {
    const obj: IObj = {
      limit: 24,
      page: 1,
    }

    if (!!type && [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type)) {
      const providerEnum = Object.values(EnumTypeProvider)
      if (providerEnum.includes(type! as EnumTypeProvider)) {
        obj.provider = type as EnumTypeProvider
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
    enabled: [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type),
  })

  const { data: dataPosts } = useQuery({
    queryFn: () => getPosts(filter),
    queryKey: ["posts-manager", filter],
    enabled: type === EnumTypeProvider.POST,
  })

  const list = data?.data ?? []
  const listPosts = dataPosts?.data ?? []

  if ([EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type))
    return (
      <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto">
        {list.map((item) => (
          <CardBallon key={`manager:offer-${page}-${item.id}`} offer={item} />
        ))}
      </ul>
    )
  if (type === EnumTypeProvider.POST)
    return (
      <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-full overflow-y-auto">
        {listPosts.map((item) => (
          <CardPost key={`manager:posts-${page}-${item.id}`} post={item} />
        ))}
      </ul>
    )

  return null
}

ComponentsOffers.displayName = "ComponentsOffers"
export default ComponentsOffers
