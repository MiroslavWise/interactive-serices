import { type Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "./providers"

import "@/scss/init.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sheira",
  description: "Шейра — это сайт, где люди меняются услугами в своем городе. Sheira is a site where people swap services in their city",
  keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", ""],
  robots: process.env.NEXT_PUBLIC_URL,
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}