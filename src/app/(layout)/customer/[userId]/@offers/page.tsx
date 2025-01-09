import { EnumTypeProvider } from "@/types/enum"
import { type IParamsCustomer } from "../layout"
import { EProviderLinkCustomer } from "../components/LinkService"

import ItemsPosts from "./components/ItemsPosts"
import ItemServiceData from "./components/ItemService-data"
import WrapperItemService from "./components/WrapperItemService"

import { getUserIdOffers } from "@/services"
import { nameTitle } from "@/lib/names"

export const dynamic = "force-dynamic"
export const dynamicParams = true
export const fetchCache = "force-no-store"

export default async ({ params, searchParams }: IParamsCustomer) => {
  const provider = (searchParams?.provider as EProviderLinkCustomer) || EProviderLinkCustomer.offer
  const id = params?.userId

  if (provider === EProviderLinkCustomer.post) {
    return <ItemsPosts id={Number(id)} />
  }

  const pr = (provider
    ? Object.values(EProviderLinkCustomer).includes(provider!)
      ? provider
      : EProviderLinkCustomer.offer
    : EProviderLinkCustomer.offer) as unknown as EnumTypeProvider

  const { data } = await getUserIdOffers(id, { provider: pr, order: "DESC" })
  const items = data || []
  const length = items.length

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
