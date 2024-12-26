import { type IParamsCustomer } from "../layout"

import LinkService, { EProviderLinkCustomer, ILink } from "../components/LinkService"

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

export default ({ searchParams }: IParamsCustomer) => {
  const provider = searchParams?.provider as EProviderLinkCustomer

  const pr = provider
    ? Object.values(EProviderLinkCustomer).includes(provider!)
      ? provider
      : EProviderLinkCustomer.offer
    : EProviderLinkCustomer.offer

  return (
    <section className="w-full flex flex-row flex-nowrap h-11 rounded-[1.375rem] bg-BG-second p-1 min-h-11">
      {LINKS_PROVIDER_OFFERS.map((_) => (
        <LinkService key={`::key::link::customer::${_.provider}::`} provider={_.provider} label={_.label} active={_.provider === pr} />
      ))}
    </section>
  )
}
