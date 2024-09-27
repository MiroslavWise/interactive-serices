import { type Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: "Telegram верификация",
  openGraph: {
    title: "Telegram верификация",
  },
}

export const dynamicParams = true

export default ({ children }: { children: ReactNode }) => <Suspense fallback={false}>{children}</Suspense>
