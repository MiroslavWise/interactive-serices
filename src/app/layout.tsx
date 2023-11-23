import Head from "next/head"
import { type Metadata } from "next"
import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { Inter } from "next/font/google"

import { Glasses } from "@/components/layout"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const Providers = dynamic(() => import("./providers"), { ssr: false })

const inter = Inter({ subsets: ["latin"], style: "normal" })

const viewport = "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"

export const metadata: Metadata = {
    title: "Sheira",
    description:
        "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <Head>
                <meta name="viewport" content={viewport} />
                <meta
                    name="theme-color"
                    media="(color-scheme: light)"
                    content="#f9fafb"
                />
                <meta
                    name="theme-color"
                    media="(color-scheme: dark)"
                    content="#232738"
                />
            </Head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
                <Glasses />
            </body>
        </html>
    )
}
