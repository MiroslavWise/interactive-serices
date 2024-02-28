import { type Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: "Яндекс",
  icons: {
    icon: "/icons/fill/yandex.svg",
  },
  openGraph: {
    title: "Яндекс",
  },
  appleWebApp: {
    title: "Яндекс",
  },
}

export default function LayoutYandex({ children }: { children: ReactNode }) {
  return <Suspense fallback={false}>{children}</Suspense>
}
