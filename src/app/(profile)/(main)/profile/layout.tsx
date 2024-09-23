import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Профиль",
  openGraph: { title: "Профиль" },
  twitter: { title: "Профиль" },
}

export default ({ children }: PropsWithChildren) => children
