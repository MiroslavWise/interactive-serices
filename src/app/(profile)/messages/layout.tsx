import { type Metadata } from "next"

import "./layout.scss"

export const metadata: Metadata = {
  title: "Сообщения",
  openGraph: { title: "Сообщения" },
  twitter: { title: "Сообщения" },
}

export default ({ children }: { children: React.ReactNode }) => <div className="__page-messages__">{children}</div>
