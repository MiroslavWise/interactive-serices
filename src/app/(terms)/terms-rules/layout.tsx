import { type Metadata } from "next"

const title = "Правилами пользования"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, rules",
  openGraph: { title, description: title },
}

export default function LayoutTermsPolicy({ children }: { children: React.ReactNode }) {
  return children
}
