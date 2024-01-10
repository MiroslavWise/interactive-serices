import Script from "next/script"
import { Viewport } from "next"
import { type Metadata } from "next"
import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { Inter } from "next/font/google"

import { NavBarProfile } from "@/components/layout"
const Providers = dynamic(() => import("./providers"), { ssr: false })

import env from "@/config/environment"
import { SITE_MAP } from "@/helpers/site-map"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"], style: "normal" })

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
        title: {
            default: "Sheira",
            template: "%s | Sheira",
        },
        images: "./favicon.ico",
        description:
            "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
    },
    twitter: {
        title: {
            default: "Sheira",
            template: "%s | Sheira",
        },
        images: "./favicon.ico",
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
        icon: `./favicon.ico`,
    },
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <Script src={`/scripts/yandex-metrics-${env!?.server!?.host!?.includes("dev") ? "dev" : "prod"}.js`} />
                <noscript>
                    <div>
                        <img
                            src={
                                env!?.server!?.host!?.includes("dev")
                                    ? "https://mc.yandex.ru/watch/95807492"
                                    : "https://mc.yandex.ru/watch/95807535"
                            }
                            style={{ position: "absolute", left: -9999 }}
                            alt="-"
                        />
                    </div>
                </noscript>
            </head>
            <body className={inter.className}>
                <Providers>
                    <NavBarProfile />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
