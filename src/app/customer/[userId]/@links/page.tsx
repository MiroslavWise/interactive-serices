import { type IParamsCustomer } from "../layout"

import LinkService, { EProviderLinkCustomer, ILink } from "../components/LinkService"

const LINKS: ILink[] = [
  {
    label: "Предложения",
    provider: EProviderLinkCustomer.offer,
  },
  {
    label: "Обсуждения",
    provider: EProviderLinkCustomer.discussion,
  },
  {
    label: "SOS",
    provider: EProviderLinkCustomer.alert,
  },
]

export default async ({ searchParams }: IParamsCustomer) => {
  const provider = searchParams?.provider

  const pr = provider
    ? Object.values(EProviderLinkCustomer).includes(provider!)
      ? provider
      : EProviderLinkCustomer.offer
    : EProviderLinkCustomer.offer

  return (
    <section className="w-full grid grid-cols-3 gap-1 h-11 rounded-[1.375rem] bg-BG-second p-1 min-h-11">
      {LINKS.map((_) => (
        <LinkService key={`::key::link::customer::${_.provider}::`} provider={_.provider} label={_.label} active={_.provider === pr} />
      ))}
    </section>
  )
}
