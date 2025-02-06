import { Metadata } from "next"

import OfferItemLink from "../components/OfferItemLink"
import ComponentsOffers from "../components/ComponentsOffers"

import { LINKS_OFFER } from "../utils/constants"
import ComponentSortActive from "../components/ComponentSortActive"

export const metadata: Metadata = {
  title: "Панель менеджера | Активности",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default () => (
  <section className="w-full flex flex-col p-5 gap-7 bg-BG-second h-full ">
    <nav className="w-full flex flex-row gap-5 items-center justify-start">
      {LINKS_OFFER.map(({ path, label }) => (
        <OfferItemLink key={`:d:v:B:N:M-${path}:`} q={path} label={label} />
      ))}
      <ComponentSortActive />
    </nav>
    <section className="w-full overflow-y-auto scroll-no flex flex-col gap-5 h-full">
      <ComponentsOffers />
    </section>
  </section>
)
