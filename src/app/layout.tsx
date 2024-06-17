import { Viewport } from "next"
import Script from "next/script"
import dynamic from "next/dynamic"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

const Providers = dynamic(() => import("./providers"), { ssr: false })
const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"), { ssr: false })

import { cx } from "@/lib/cx"
import env from "@/config/environment"

import "@/scss/init.scss"
import "./build.css"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"], style: "normal", variable: "--font-inter" })

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
    maximumScale: 1,
    minimumScale: 1,
  }
}

export const metadata: Metadata = {
  title: {
    default: "Sheira",
    template: "%s | Sheira",
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
    images: "/icons/icon.png",
  },
  twitter: {
    images: "/icons/icon.png",
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
    icon: "/icons/icon.png",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
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
