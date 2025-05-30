import Script from "next/script"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { type PropsWithChildren } from "react"
import { type Viewport, type Metadata } from "next"

import IconSpriteHeart from "@/components/icons/icon-sprite-heart"
import IconSpriteDefault from "@/components/icons/icon-sprite-default"
const Providers = dynamic(() => import("./providers"), { ssr: false })
import ButtonHelpTelegram from "@/components/templates/ButtonHelpTelegram"
const IconFillSprite = dynamic(() => import("@/components/icons/icon-sprite"))
const IconSpriteCategory = dynamic(() => import("@/components/icons/icon-sprite-category"))

import { cx } from "@/lib/cx"
import env, { APPLE_ID, APPLE_NAME, keyWords, URL_APPLE_APP } from "@/config/environment"

import "@/scss/init.scss"
import "./build.css"
import "react-toastify/dist/ReactToastify.css"

import { schemaOrg } from "@/utils/schema-org"

export const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"], style: "normal", variable: "--font-inter" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
}

export function generateMetadata(): Metadata {
  const urlIcon = `/icons/icon.png`

  const meta: Metadata = {
    appLinks: {
      ios: {
        url: URL_APPLE_APP,
        app_store_id: APPLE_ID,
        app_name: APPLE_NAME,
      },
      ipad: {
        url: URL_APPLE_APP,
        app_store_id: APPLE_ID,
        app_name: APPLE_NAME,
      },
      iphone: {
        url: URL_APPLE_APP,
        app_store_id: APPLE_ID,
        app_name: APPLE_NAME,
      },
    },
    itunes: {
      appId: APPLE_ID,
      appArgument: URL_APPLE_APP,
    },
    applicationName: "Interactive Services",
    title: {
      default: "Interactive Services",
      template: "%s | Interactive Services",
    },
    authors: {
      url: env.server.host!,
      name: "Interactive Services",
    },
    description: "Сервис с интерактивной картой города. Можно размещать свои услуги, проводить активности, общаться и помогать друг другу",
    keywords: keyWords,
    appleWebApp: {
      capable: true,
      title: APPLE_NAME,
      statusBarStyle: "default",
    },
    category: "people, services, услуги, обмен",
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: env.server.host!,
      siteName: "Interactive Services",
      description:
        "Сервис с интерактивной картой города, где можно размещать свои услуги, проводить активности, общаться и помогать друг другу",
      title: {
        default: "Interactive Services",
        template: "%s | Interactive Services. Люди, события, услуги",
      },
      images: `${env.server.host!}/api/og`,
    },
    twitter: {
      site: env.server.host!,
      title: {
        default: "Interactive Services",
        template: "%s | Interactive Services. Люди, события, услуги",
      },
      description:
        "Сервис с интерактивной картой города. Можно размещать свои услуги, проводить активности, общаться и помогать друг другу",
      images: `${env.server.host!}/api/og`,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "standard",
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "standard",
      },
    },
    icons: {
      icon: urlIcon,
    },
    verification: {
      google: "hfKw4monM0fi5poRbzhQUEtQAtGubTdz3pN2Pxc-lGw",
      yandex: "b991e6c18bd99d04",
    },
  }

  return meta
}

var ymaps3 = null

export default async ({ children }: PropsWithChildren) => (
  <html lang="ru" suppressHydrationWarning>
    <head>
      <link rel="preconnect" href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`} />
      <link rel="dns-prefetch" href={env!?.server!?.host!?.includes("dev") ? "https://mc.yandex.ru" : "https://mc.yandex.ru"} />
      <Script
        id={env!?.server!?.host!?.includes("dev") ? `yandex-metrics-dev` : `yandex-metrics-prod`}
        dangerouslySetInnerHTML={{
          __html: env!?.server!?.host!?.includes("dev")
            ? `
                ;(function (m, e, t, r, i, k, a) {
                  m[i] =
                    m[i] ||
                    function () {
                      ;(m[i].a = m[i].a || []).push(arguments)
                    }
                  m[i].l = 1 * new Date()
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) {
                      return
                    }
                  }
                  ;(k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

                ym(95807492, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true,
                })
              `
            : `
                ;(function (m, e, t, r, i, k, a) {
                  m[i] =
                    m[i] ||
                    function () {
                      ;(m[i].a = m[i].a || []).push(arguments)
                    }
                  m[i].l = 1 * new Date()
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) {
                      return
                    }
                  }
                  ;(k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

                ym(95807535, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true,
                })
              `,
        }}
      />
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
    <body className={cx(inter.className, inter.variable)} id="body-layout" suppressHydrationWarning>
      <NextTopLoader />
      <Providers>{children}</Providers>
      <ButtonHelpTelegram />
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${env.api_key_yandex}&lang=ru_RU`}
        strategy="beforeInteractive"
        type="text/javascript"
        id="yandex-3-0"
      />
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaOrg,
        }}
      />
      <IconFillSprite />
      <IconSpriteCategory />
      <IconSpriteDefault />
      <IconSpriteHeart />
    </body>
  </html>
)
