import { type Metadata } from "next"
import { type ReactNode } from "react"

import { URL_APPLE_APP } from "@/config/environment"

const title = `Мобильное приложение AppStore Sheira: услуги и обсуждения`
const description = `Sheira помогает быстро находить специалистов, размещать свои услуги, проводить активности, обсуждать локальные вопросы, помогать друг другу. И всё это на карте города.
  Sheira помогает быстро находить специалистов, размещать свои услуги, проводить активности, обсуждать важные локальные вопросы, помогать друг другу. И всё это на карте города.`

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: URL_APPLE_APP,
  },
  twitter: {
    title: title,
    description: description,
  },
}

export default ({ children }: { children: ReactNode }) => children
