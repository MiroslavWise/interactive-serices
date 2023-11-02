import { type Metadata } from "next"
import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import { Inter } from "next/font/google"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"
import "react-datepicker/dist/react-datepicker.css"

const Providers = dynamic(() => import("./providers"), { ssr: false })

const inter = Inter({ subsets: ["latin"], style: "normal" })

export const metadata: Metadata = {
    title: "Sheira",
    description:
        "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    // robots: "noindex, nofollow",
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
                ></meta>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
            </head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
