import { type Metadata } from "next"
import { type ReactNode } from "react"

const title = "Согласие на получение рассылки рекламно-информационных материалов"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "consent-to-receive-mailings, terms",
  openGraph: { title, description: title },
}

export default function LayoutTermsConsentToReceiveMailings({ children }: { children: ReactNode }) {
  return children
}
