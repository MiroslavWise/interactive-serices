import { Inter } from 'next/font/google'
import { type Metadata } from 'next'

import { Providers } from 'context'
import 'styles/init.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sheira',
  description: 'Шейра — это сайт, где люди меняются услугами в своем городе. Shayra is a site where people swap services in their city',
  keywords: ['sheira', 'Шейра', 'услуги', 'товары', 'обмен', ''],
  robots: process.env.NEXT_PUBLIC_URL,
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
