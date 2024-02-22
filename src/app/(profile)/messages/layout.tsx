import { type Metadata } from "next"
import { type ReactNode } from "react"

import "./layout.scss"

export const metadata: Metadata = {
  title: "Сообщения",
  openGraph: { title: "Сообщения" },
  twitter: { title: "Сообщения" },
}

export default function LayoutMessages({ children }: { children: ReactNode }) {
  return <div className="__page-messages__">{children}</div>
}
