import { type Metadata } from "next"
import { type PropsWithChildren, Suspense } from "react"

export const metadata: Metadata = {
  title: "Telegram верификация",
  openGraph: {
    title: "Telegram верификация",
  },
}

export default ({ children }: PropsWithChildren) => <Suspense fallback={false}>{children}</Suspense>
