import { type ReactNode } from "react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "./providers"
import { FooterMenu } from "@/components/layout/FooterMenu"
import { SignPopup } from "@/components/auth/Signin/SignPopup"

import "@/scss/init.scss"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"], style: "normal" })

export const metadata: Metadata = {
  title: "Sheira",
  description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
  keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", ""],
}

export default function Layout(props: {
  children: ReactNode,
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {props.children}
          <FooterMenu />
          <SignPopup />
        </Providers>
        <span className="glass-circle-1" /> 
        <span className="glass-circle-2" /> 
        <span className="glass-circle-3" /> 
        <span className="glass-circle-4" /> 
      </body>
    </html>
  )
}