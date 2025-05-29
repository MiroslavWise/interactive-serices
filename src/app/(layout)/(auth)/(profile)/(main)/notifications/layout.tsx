import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Уведомления",
  openGraph: { title: "Уведомления" },
  twitter: { title: "Уведомления" },
}

export default ({ children }: PropsWithChildren) => children
