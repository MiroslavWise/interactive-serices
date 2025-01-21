import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

const title = "Вход для главы компании"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "ads-agreement, terms",
  openGraph: { title, description: title },
}

export default ({ children }: PropsWithChildren) => <main className="w-full h-dvh flex items-center justify-center md:p-5">{children}</main>
