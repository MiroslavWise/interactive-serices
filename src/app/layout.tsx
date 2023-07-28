import { type ReactNode } from "react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "./providers"
import { FooterMenu } from "@/components/layout/FooterMenu"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"],style: "normal" })

export const metadata: Metadata = {
  title: "Sheira",
  description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
  keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", ""],
}

export default function RootLayout({
  children, modal_sign
}: {
    children: ReactNode,
    modal_sign: ReactNode
  }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {children}
          <FooterMenu />
          {modal_sign}
        </Providers>
      </body>
    </html>
  )
}