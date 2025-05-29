"use client"

import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"
import LinkService, { EProviderLinkCustomer, ILink } from "./LinkService"

export const LINKS_PROVIDER_OFFERS: ILink[] = [
  {
    label: "Умения и услуги",
    provider: EProviderLinkCustomer.offer,
  },
  {
    label: "События",
    provider: EProviderLinkCustomer.post,
  },
  {
    label: "SOS",
    provider: EProviderLinkCustomer.alert,
  },
]

function ComponentLinks() {
  const [provider, setProvider] = useQueryState(
    "provider",
    parseAsStringEnum<EProviderLinkCustomer>(Object.values(EProviderLinkCustomer)).withDefault(EProviderLinkCustomer.offer),
  )
  const [_, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  return (
    <section className="w-full flex flex-row flex-nowrap h-11 rounded-[1.375rem] bg-BG-second p-1 min-h-11">
      {LINKS_PROVIDER_OFFERS.map((_) => (
        <LinkService
          key={`::key::link::customer::${_.provider}::`}
          provider={_.provider}
          label={_.label}
          active={provider === _.provider}
          on={(value) => {
            setProvider(value)
            setPage(null)
          }}
        />
      ))}
    </section>
  )
}

export default ComponentLinks
