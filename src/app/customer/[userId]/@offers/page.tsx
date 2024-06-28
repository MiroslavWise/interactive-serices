import { cache } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IParamsCustomer } from "../layout"
import { EProviderLinkCustomer } from "../components/LinkService"

import ItemServiceData from "./components/ItemService-data"
import WrapperItemService from "./components/WrapperItemService"

import { getUserIdOffers } from "@/services"

const getCacheOffers = cache(getUserIdOffers)

export default async ({ params, searchParams }: IParamsCustomer) => {
  const provider = searchParams?.provider || EProviderLinkCustomer.offer
  const id = params?.userId

  const pr = (provider
    ? Object.values(EProviderLinkCustomer).includes(provider!)
      ? provider
      : EProviderLinkCustomer.offer
    : EProviderLinkCustomer.offer) as unknown as EnumTypeProvider

  const { res } = await getCacheOffers(id, { provider: pr, order: "DESC" })

  const items = res || []

  const length = items.length

  return (
    <section className={`w-full h-full flex flex-col gap-0.625 ${!length && "items-center justify-center"}`}>
      {length ? (
        <>
          <p className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
            {length}{" "}
            {provider === EProviderLinkCustomer.discussion
              ? "обсуждения"
              : provider === EProviderLinkCustomer.alert
              ? "SOS-сообщения"
              : "предложения"}
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
            : "Нет предложений"}
        </p>
      )}
    </section>
  )
}
