import { type Metadata } from "next"

const title = "Правилами пользования"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, rules",
  openGraph: { title, description: title },
}

export const dynamic = "force-static"
export const dynamicParams = false

export default function LayoutTermsPolicy({ children }: { children: React.ReactNode }) {
  return children
}
