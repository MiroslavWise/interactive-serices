import Script from "next/script"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"

import { type PropsWithChildren } from "react"
import { type Viewport, type Metadata } from "next"

const Providers = dynamic(() => import("./providers"), { ssr: false })
const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"), { ssr: false })

import { cx } from "@/lib/cx"
import env, { APPLE_ID, APPLE_NAME, keyWords, URL_APPLE_APP } from "@/config/environment"

import "@/scss/init.scss"
import "./build.css"
import "react-toastify/dist/ReactToastify.css"

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
    applicationName: "Sheira",
    title: {
      default: "Sheira",
      template: "%s | Sheira",
    },
    authors: {
      url: env.server.host!,
      name: "Sheira",
    },
    description:
      "Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные вопросы и сообщают о локальных проблемах.",
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
      siteName: "Sheira",
      description:
        "Сервис с интерактивной картой города, где можно размещать свои услуги, проводить активности, общаться и помогать друг другу",
      title: {
        default: "Sheira",
        template: "%s | Sheira. Люди, события, услуги",
      },
      images: `${env.server.host!}/api/og`,
    },
    twitter: {
      site: env.server.host!,
      title: {
        default: "Sheira",
        template: "%s | Sheira. Люди, события, услуги",
      },
      description:
        "Sheira - сервис с интерактивной картой городов. Обычные люди размещают здесь свои услуги для обмена и продажи, обсуждают важные вопросы и сообщают о локальных проблемах.",
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
      yandex: "b991e6c18bd99d04",
    },
  }

  return meta
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`} />
        <link rel="canonical" key="canonical" href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/categories`} />
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
        {!env!?.server!?.host.includes("dev") && <Script src="https://s.sdelka.biz/20431827.js" />}
        <noscript>
          <div>
            <img
              src={env!?.server!?.host!?.includes("dev") ? "https://mc.yandex.ru/watch/95807492" : "https://mc.yandex.ru/watch/95807535"}
              style={{ position: "absolute", left: -9999 }}
              alt="-"
            />
          </div>
        </noscript>
        {!env!?.server!?.host!?.includes("dev") ? (
          <Script
            id="mail-ru-metrics"
            dangerouslySetInnerHTML={{
              __html: `
                  var _tmr = window._tmr || (window._tmr = [])
                  _tmr.push({ id: "3519466", type: "pageView", start: new Date().getTime() })
                  ;(function (d, w, id) {
                    if (d.getElementById(id)) return
                    var ts = d.createElement("script")
                    ts.type = "text/javascript"
                    ts.async = true
                    ts.id = id
                    ts.src = "https://top-fwz1.mail.ru/js/code.js"
                    var f = function () {
                      var s = d.getElementsByTagName("script")[0]
                      s.parentNode.insertBefore(ts, s)
                    }
                    if (w.opera == "[object Opera]") {
                      d.addEventListener("DOMContentLoaded", f, false)
                    } else {
                      f()
                    }
                  })(document, window, "tmr-code")
                `,
            }}
          />
        ) : null}
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
