import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

const title = "Уведомление об использовании файлов куки (cookie)"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, rules",
  openGraph: { title, description: title },
}

export default ({ children }: PropsWithChildren) => children
