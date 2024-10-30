import { Suspense } from "react"
import { type Metadata } from "next"

import env from "@/config/environment"

export const metadata: Metadata = {
  title: "Регистрация",
  description:
    "Регистрация на Sheira для оказания и получения услуг, обсуждения разных вопросов в своей местности и предупреждения какой-то опасности",
  appleWebApp: {
    title: "Sheira | Регистрация",
    statusBarStyle: "default",
  },
  openGraph: {
    url: `${env.server.host!}/registration`,
    siteName: "Sheira | Регистрация",
  },
  category: "people, register, регистрация, услуги",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default ({ children }: React.PropsWithChildren) => <Suspense fallback={null}>{children}</Suspense>
