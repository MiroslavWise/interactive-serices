import Head from "next/head"
import { type Metadata } from "next"
import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { Inter } from "next/font/google"
import { Viewport } from "next"

import { Glasses } from "@/components/layout"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const Providers = dynamic(() => import("./providers"), { ssr: false })

import { LinkImagesPreload } from "@/helpers/assets/link-images"

const inter = Inter({ subsets: ["latin"], style: "normal" })

export function generateViewport(): Viewport {
    return {
        width: "device-width",
        initialScale: 1,
        userScalable: false,
        maximumScale: 1,
        minimumScale: 1,
        height: "device-height",
        viewportFit: "cover",
    }
}

export const metadata: Metadata = {
    title: "Sheira",
    description:
        "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    appleWebApp: {
        title: "Sheira",
        statusBarStyle: "default",
    },
    category: "people, services",
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <Head>
                {LinkImagesPreload.map((item) => (
                    <link key={item} rel="prefetch prerender" href={item} />
                ))}
            </Head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
                <Glasses />
            </body>
        </html>
    )
}
