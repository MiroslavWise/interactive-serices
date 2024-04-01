import { type Metadata } from "next"

const title = "Политика обработки персональных данных"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, terms",
  openGraph: { title, description: title },
}

export default function LayoutTermsPolicy({ children }: { children: React.ReactNode }) {
  return children
}
