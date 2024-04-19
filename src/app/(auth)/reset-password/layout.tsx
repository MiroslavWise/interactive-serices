import { type Metadata } from "next"
import { Suspense, type ReactNode } from "react"

export const metadata: Metadata = {
  title: "Восстановление пароля",
  openGraph: {
    title: "Восстановление пароля",
  },
  appleWebApp: {
    title: "Восстановление пароля",
  },
}

export default ({ children }: { children: ReactNode }) => <Suspense fallback={false}>{children}</Suspense>
