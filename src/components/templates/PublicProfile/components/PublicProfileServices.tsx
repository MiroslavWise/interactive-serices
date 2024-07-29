import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import { ServiceLoading } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserIdOffers } from "@/services"
import { nameTitle } from "@/app/customer/[userId]/@offers/page"
import { LINKS_PROVIDER_OFFERS } from "@/app/customer/[userId]/@links/page"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, usePublicProfile } from "@/store"
import ItemServiceData from "@/app/customer/[userId]/@offers/components/ItemService-data"

function PublicProfileServices() {
  const id = usePublicProfile(({ id }) => id)
  const [state, setState] = useState<EnumTypeProvider>(EnumTypeProvider.offer)

  const { data: dataOffers, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(id!, { provider: state, order: "DESC" }),
    queryKey: ["offers", { userId: id, provider: state }],
    enabled: !!id!,
  })

  const itemsOffers = dataOffers?.data || []
  const length = itemsOffers.length

  const name = nameTitle(length, state)

  function handle(offer: IResponseOffers) {
    if (offer.provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer })
    }
    if (offer.provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer })
    }
    if (offer.provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer })
    }
  }

  return (
    <section className={cx("w-full flex flex-col gap-3")}>
      <nav className="w-full p-1 h-11 rounded-[1.375rem] bg-BG-second *:h-9 grid grid-cols-3">
        {LINKS_PROVIDER_OFFERS.map(({ provider, label }) => (
          <a
            key={`::key::pr::${provider}::`}
            className={cx(
              "h-9 rounded-[1.125rem] w-full flex items-center justify-center",
              "[&>span]:text-sm [&>span]:text-center [&>span]:font-medium",
              state === (provider as unknown as EnumTypeProvider)
                ? "bg-element-accent-2 [&>span]:text-text-tab"
                : "[&>span]:text-text-secondary cursor-pointer",
            )}
            onClick={() => setState(provider as unknown as EnumTypeProvider)}
          >
            <span>{label}</span>
          </a>
        ))}
      </nav>
      {isLoading ? (
        <ul className="loading-screen w-full flex flex-col gap-3">
          {[`key-load-${state}-1`, `key-load-${state}-2`, `key-load-${state}-3`, `key-load-${state}-4`].map((item) => (
            <ServiceLoading key={`:key:load:${item}:--`} />
          ))}
        </ul>
      ) : length === 0 ? (
        <p className="text-text-primary text-sm font-normal text-center whitespace-nowrap mt-16">
          {state === EnumTypeProvider.discussion
            ? "Нет обсуждений"
            : state === EnumTypeProvider.alert
            ? "Нет SOS-сообщений"
            : "Нет предложений"}
        </p>
      ) : (
        <ul className="w-full flex flex-col gap-3">
          <p className="text-text-secondary text-sm text-left font-medium">
            {length} {name}
          </p>
          {itemsOffers.map((item) => (
            <li
              key={`:key:${item.id}:${item.provider}:`}
              onClick={() => handle(item)}
              className="relative w-full px-4 pt-3 pb-4 bg-BG-second rounded-2xl flex flex-col gap-4 cursor-pointer"
            >
              <ItemServiceData offer={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PublicProfileServices
