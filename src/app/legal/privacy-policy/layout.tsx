import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

const title = "Политика обработки персональных данных"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, terms",
  openGraph: { title, description: title },
}

export default ({ children }: PropsWithChildren) => children
