import { Viewport } from "next"
import Script from "next/script"
import dynamic from "next/dynamic"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"), { ssr: false })
const Providers = dynamic(() => import("./providers"), { ssr: false })

import env from "@/config/environment"
import { cx } from "@/lib/cx"

import "@/scss/init.scss"
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
  description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
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
    title: {
      default: "Sheira",
      template: "%s | Sheira",
    },
    images: "/icons/icon.png",
    description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
  },
  twitter: {
    title: {
      default: "Sheira",
      template: "%s | Sheira",
    },
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
