import { type Metadata } from "next"
import { type ReactNode } from "react"

const title = "Правилами пользования"

export const metadata: Metadata = {
    title,
    description: title,
    appleWebApp: { title, statusBarStyle: "default" },
    category: "policy, rules",
    openGraph: { title, description: title },
}

export default function LayoutTermsPolicy({ children }: { children: ReactNode }) {
    return children
}
