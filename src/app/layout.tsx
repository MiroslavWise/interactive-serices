import Script from "next/script"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import { type Viewport, type Metadata } from "next"

const Providers = dynamic(() => import("./providers"), { ssr: false })
const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"), { ssr: false })

import { cx } from "@/lib/cx"
import env from "@/config/environment"

import "@/scss/init.scss"
import "./build.css"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"], style: "normal", variable: "--font-inter" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
}

export function generateMetadata(): Metadata {
  const urlIcon = "/icons/icon.png"
  const APPLE_URL =
    "https://apps.apple.com/ru/app/sheira-%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%81%D1%83%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F/id6504366029"
  const APPLE_ID = "6504366029"
  const APPLE_NAME = "Sheira: услуги и обсуждения"

  const meta: Metadata = {
    appLinks: {
      ios: {
        url: APPLE_URL,
        app_store_id: APPLE_ID,
        app_name: APPLE_NAME,
      },
      iphone: {
        url: APPLE_URL,
        app_store_id: APPLE_ID,
        app_name: APPLE_NAME,
      },
    },
    itunes: {
      appId: APPLE_ID,
      appArgument: APPLE_URL,
    },
    title: {
      default: "Sheira",
      template: "%s | Sheira",
    },
    authors: {
      url: "https://sheira.ru",
      name: "ООО Sheira",
    },
    description:
      "Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные вопросы и сообщают о локальных проблемах.",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    appleWebApp: {
      title: "Sheira",
      statusBarStyle: "default",
    },
    category: "people, services",
    openGraph: {
      type: "website",
      locale: "ru",
      url: env.server.host!,
      siteName: "Sheira",
      images: urlIcon,
    },
    twitter: {
      images: urlIcon,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "standard",
      },
    },
    icons: {
      icon: urlIcon,
    },
  }

  return meta
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`} />
        <Script src={`/scripts/yandex-metrics-${env!?.server!?.host!?.includes("dev") ? "dev" : "prod"}.js`} />
        <noscript>
          <div>
            <img
              src={env!?.server!?.host!?.includes("dev") ? "https://mc.yandex.ru/watch/95807492" : "https://mc.yandex.ru/watch/95807535"}
              style={{ position: "absolute", left: -9999 }}
              alt="-"
            />
          </div>
        </noscript>
        {!env!?.server!?.host!?.includes("dev") ? <Script src="/scripts/mail-ru-metrics.js" /> : null}
        <noscript>
          <div>
            <img
              src="https://top-fwz1.mail.ru/counter?id=3519466;js=na"
              style={{ position: "absolute", left: "-9999px" }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>
      </head>
      <body className={cx(inter.className, inter.variable)} id="body-layout">
        <Providers>
          <NavBarProfile />
          {children}
        </Providers>
      </body>
    </html>
  )
}
