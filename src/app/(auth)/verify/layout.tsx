import { type Metadata } from "next"
import { type PropsWithChildren, Suspense } from "react"

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

export default ({ children }: PropsWithChildren) => <Suspense fallback={null}>{children}</Suspense>
