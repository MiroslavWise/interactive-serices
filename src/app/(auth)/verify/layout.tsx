import { type Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: "Верификация",
  openGraph: {
    title: "Верификация",
  },
  appleWebApp: {
    title: "Верификация",
  },
}

export const dynamicParams = true

export default ({ children }: { children: ReactNode }) => <Suspense fallback={false}>{children}</Suspense>
