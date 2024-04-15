import { type Metadata } from "next"

const title = "Согласие на получение рассылки рекламно-информационных материалов"

export const dynamic = "force-static"
export const dynamicParams = false

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "consent-to-receive-mailings, terms",
  openGraph: { title, description: title },
}

export default function LayoutTermsConsentToReceiveMailings({ children }: { children: React.ReactNode }) {
  return children
}
