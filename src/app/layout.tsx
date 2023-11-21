import { type Metadata } from "next"
import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { Inter } from "next/font/google"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"
import Head from "next/head"

const Providers = dynamic(() => import("./providers"), { ssr: false })

const inter = Inter({ subsets: ["latin"], style: "normal" })

const viewport = "width=device-width, initial-scale=1, user-scalable=no"

export const metadata: Metadata = {
    title: "Sheira",
    description:
        "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    // viewport: viewport,
    // viewport: {
    //     width: "device-width",
    //     initialScale: 1,
    //     maximumScale: 1,
    //     minimumScale: 1,
    //     viewportFit: "cover",
    //     userScalable: false,
    //     height: "device-height",
    // },
    // robots: "noindex, nofollow",
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <Head>
                <meta name="viewport" content={viewport} />
            </Head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
