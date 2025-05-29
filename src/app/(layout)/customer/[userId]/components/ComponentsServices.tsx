"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"
import { EProviderLinkCustomer } from "./LinkService"

import ItemPost from "../offers/components/ItemPost"
import PaginationRS from "@/components/common/PaginationRS"
import ComponentLoadingService from "./ComponentLoadingService"
import ItemServiceData from "../offers/components/ItemService-data"
import WrapperItemService from "../offers/components/WrapperItemService"

import { cx } from "@/lib/cx"
import { nameTitle } from "@/lib/names"
import { getOffers } from "@/services"
import { getPosts } from "@/services/posts"

const PAGE_SIZE = 12

const NAV: { value: boolean; label: string }[] = [
  {
    label: "Активные",
    value: false,
  },
  {
    label: "В архиве",
    value: true,
  },
]

function ComponentsServices({ userId }: { userId: number | string }) {
  const [archive, setArchive] = useState(false)
  const [provider] = useQueryState(
    "provider",
    parseAsStringEnum<EProviderLinkCustomer>(Object.values(EProviderLinkCustomer)).withDefault(EProviderLinkCustomer.offer),
  )
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getOffers({
        provider: provider as unknown as EnumTypeProvider,
        order: "DESC",
        user: userId! as number,
        page: page,
        limit: PAGE_SIZE,
      }),
    queryKey: ["offers", { userId: userId, provider: provider, page: page, limit: PAGE_SIZE }],
    enabled: [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(provider! as unknown as EnumTypeProvider),
  })

  const { data: dataPosts, isLoading: isLoadingPosts } = useQuery({
    queryFn: () => getPosts({ order: "DESC", archive: archive ? 1 : 0, user: userId! as number }),
    queryKey: ["posts", { userId: userId, order: "DESC", archive: archive }],
  })

  const items = data?.data ?? []
  const total = data?.meta?.total

  const itemsPosts = dataPosts?.data ?? []
  const lengthPosts = itemsPosts.length

  if (isLoading || isLoadingPosts) return <ComponentLoadingService />

  if (provider === EProviderLinkCustomer.post)
    return (
      <section className={`w-full h-full flex flex-col gap-2.5 ${!lengthPosts && "items-center justify-center"}`}>
        <nav className="w-full border-b border-solid border-grey-stroke flex flex-row justify-start gap-[1.125rem]">
          {NAV.map((item) => (
            <a
              key={`:NAV:${item.value}`}
              className={cx(
                "w-fit pb-1 border-b-2 border-solid cursor-pointer",
                item.value === archive ? "border-text-accent" : "border-transparent",
              )}
              onClick={() => setArchive(item.value)}
            >
              <span className={cx("text-sm font-medium", item.value === archive ? "text-text-accent" : "text-text-secondary")}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        {lengthPosts ? (
          <>
            <p className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
              {lengthPosts}&nbsp;{nameTitle(lengthPosts, EnumTypeProvider.POST)}
            </p>
            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {itemsPosts.map((item) => (
                <ItemPost key={`:key:item:post:${item.id}:`} post={item} />
              ))}
            </ul>
          </>
        ) : (
          <p className="text-text-primary text-sm font-normal whitespace-nowrap mt-10">
            {archive ? "Архивированных" : "Активных"} событий нет
          </p>
        )}
      </section>
    )

  return (
    <section className={`w-full h-full flex flex-col gap-2.5 ${!total && "items-center justify-center"}`}>
      {total ? (
        <>
          <p className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
            {total}&nbsp;{nameTitle(total!, provider)}
          </p>
          <ul className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {items.map((offer) => (
              <WrapperItemService key={`::key::item::service::${offer.id}::`} offer={offer}>
                <ItemServiceData offer={offer} />
              </WrapperItemService>
            ))}
          </ul>
          <div className="w-full flex flex-row items-center md:items-start">
            <PaginationRS total={total} page={page} onPage={setPage} pageSize={PAGE_SIZE} />
          </div>
        </>
      ) : (
        <p className="text-text-primary text-sm font-normal whitespace-nowrap mt-10">
          {provider === EProviderLinkCustomer.discussion
            ? "Нет обсуждений"
            : provider === EProviderLinkCustomer.alert
            ? "Нет SOS-сообщений"
            : "Нет умений или услуг"}
        </p>
      )}
    </section>
  )
}

export default ComponentsServices
