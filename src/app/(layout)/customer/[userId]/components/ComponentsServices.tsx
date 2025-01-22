"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsStringEnum, useQueryState } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"
import { EProviderLinkCustomer } from "./LinkService"

import ComponentLoadingService from "./ComponentLoadingService"
import ItemServiceData from "../offers/components/ItemService-data"
import WrapperItemService from "../offers/components/WrapperItemService"

import { nameTitle } from "@/lib/names"
import { getPosts } from "@/services/posts"
import { getUserIdOffers } from "@/services"
import ItemPost from "../offers/components/ItemPost"
import { cx } from "@/lib/cx"

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

  const { data, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(userId, { provider: provider as unknown as EnumTypeProvider, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: provider }],
    enabled: [EnumTypeProvider.offer, EnumTypeProvider.alert].includes(provider! as unknown as EnumTypeProvider),
  })

  const { data: dataPosts, isLoading: isLoadingPosts } = useQuery({
    queryFn: () => getPosts({ order: "DESC", archive: archive ? 1 : 0, user: userId! as number }),
    queryKey: ["posts", { userId: userId, order: "DESC", archive: archive }],
  })

  const items = data?.data ?? []
  const length = items.length

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
    <section className={`w-full h-full flex flex-col gap-2.5 ${!length && "items-center justify-center"}`}>
      {length ? (
        <>
          <p className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
            {length}&nbsp;{nameTitle(length, provider)}
          </p>
          <ul className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {items.map((offer) => (
              <WrapperItemService key={`::key::item::service::${offer.id}::`} offer={offer}>
                <ItemServiceData offer={offer} />
              </WrapperItemService>
            ))}
          </ul>
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
