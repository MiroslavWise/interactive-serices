import { cache } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { EProviderLinkCustomer } from "./ServicesAndConversations"

import ItemService from "./ItemService"

import { getUserIdOffers } from "@/services"

const getCacheOffers = cache(getUserIdOffers)

async function ItemsServices({ id, provider }: { id: number | string; provider: EProviderLinkCustomer }) {
  const { res } = await getCacheOffers(id, { provider: provider as unknown as EnumTypeProvider, order: "DESC" })

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
              <ItemService key={`::key::item::service::${offer.id}::`} offer={offer} />
            ))}
          </ul>
        </>
      ) : (
        <p className="text-text-primary text-sm font-normal whitespace-nowrap">
          {provider === EProviderLinkCustomer.discussion
            ? "Нет предложений"
            : provider === EProviderLinkCustomer.alert
            ? "Нет SOS-сообщений"
            : "Нет предложений"}
        </p>
      )}
    </section>
  )
}

ItemsServices.displayName = "ItemsServices"
export default ItemsServices
