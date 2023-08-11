import { type ReactNode } from "react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"

import { FooterMenu } from "@/components/layout/FooterMenu"
import { SignPopup } from "@/components/auth/Signin/SignPopup"
import { PhotoCarousel } from "@/components/layout/PhotoCarousel"
import { ExchangesModalMobile } from "@/components/profile/ExchangesModalMobile"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const Providers = dynamic(
  () => import("./providers"),
  { ssr: false, }
)

const inter = Inter({ subsets: ["latin"], style: "normal" })

export const metadata: Metadata = {
  title: "Sheira",
  description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
  keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", ""],
  robots: "noindex, nofollow",
}

export default function Layout({ children }: { children: ReactNode, }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {children}
          <FooterMenu />
          <SignPopup />
          <PhotoCarousel />
          <ExchangesModalMobile />
        </Providers>
        <span className="glass-circle-1" />
        <span className="glass-circle-2" />
        <span className="glass-circle-3" />
        <span className="glass-circle-4" />
      </body>
    </html>
  )
}