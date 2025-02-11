"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"
import { EOrder } from "@/services/types/general"
import { IQueriesOffers } from "@/services/offers/types"

import OfferItemLink from "../components/OfferItemLink"
import ComponentSort from "../components/ComponentSort"
import CardPost from "@/components/common/Card/CardPost"
import PaginationRS from "@/components/common/PaginationRS"
import CardBallon from "@/components/common/Card/CardBallon"

import { getOffers } from "@/services"
import { getPosts } from "@/services/posts"
import { LINKS_OFFER } from "../utils/constants"

const LIMIT = 24

export default () => {
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

  return (
    <>
      <div className="w-full flex items-center justify-between gap-2">
        <nav className="flex flex-row gap-5 items-center justify-start">
          {LINKS_OFFER.map(({ path, label }) => (
            <OfferItemLink key={`:d:v:B:N:M-${path}:`} q={path} label={label} />
          ))}
        </nav>
        <ComponentSort
          type={type}
          total={[EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type) ? total : type === EnumTypeProvider.POST ? totalPosts : 0}
        />
      </div>
      <section className="w-full overflow-y-auto scroll-no flex flex-col gap-5 h-full">
        {[EnumTypeProvider.offer, EnumTypeProvider.alert].includes(type) ? (
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
        ) : type === EnumTypeProvider.POST ? (
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
        ) : null}
      </section>
    </>
  )
}
