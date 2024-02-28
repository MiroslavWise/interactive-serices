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

export default function LayoutVerify({ children }: { children: ReactNode }) {
  return <Suspense fallback={false}>{children}</Suspense>
}
