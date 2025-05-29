import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Предложения",
  openGraph: { title: "Предложения" },
  twitter: { title: "Предложения" },
}

export default ({ children }: PropsWithChildren) => children
