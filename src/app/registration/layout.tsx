import { Metadata } from "next"

import env from "@/config/environment"

export const dynamic = "force-static"
export const dynamicParams = false

export const metadata: Metadata = {
  title: "Регистрация",
  description:
    "Регистрация на Sheira для оказания и получения услуг, обсуждения разных вопросов в своей местности и предупреждения какой-то опасности",
  keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
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

export default function LayoutTerms({ children }: { children: React.ReactNode }) {
  return children
}
