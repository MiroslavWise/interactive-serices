import { Metadata } from "next"

import ComponentUsers from "../components/ComponentUsers"

export const metadata: Metadata = {
  title: "Аккаунты компании",
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
  <section className="relative w-full bg-BG-second h-full px-5">
    <ComponentUsers />
  </section>
)
