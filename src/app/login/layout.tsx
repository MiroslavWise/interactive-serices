import { type Metadata } from "next"
import { Suspense, type PropsWithChildren } from "react"

import env from "@/config/environment"

export const metadata: Metadata = {
  title: "Вход",
  description:
    "Вход на Sheira для оказания и получения услуг, обсуждения разных вопросов в своей местности и предупреждения какой-то опасности",
  appleWebApp: {
    title: "Sheira | Вход",
    statusBarStyle: "default",
  },
  openGraph: {
    url: `${env.server.host!}/login`,
    siteName: "Sheira | Вход",
  },
  category: "people, login, логин, вход, услуги",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default ({ children }: PropsWithChildren) => <Suspense fallback={null}>{children}</Suspense>
