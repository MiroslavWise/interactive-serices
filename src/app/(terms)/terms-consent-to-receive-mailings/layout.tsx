import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Согласие на получение рассылки рекламно-информационных материалов",
    description: "Согласие на получение рассылки рекламно-информационных материалов",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    appleWebApp: {
        title: "Согласие на получение рассылки рекламно-информационных материалов",
        statusBarStyle: "default",
    },
    category: "consent-to-receive-mailings, terms",
    openGraph: {
        title: "Согласие на получение рассылки рекламно-информационных материалов",
        description: "Согласие на получение рассылки рекламно-информационных материалов",
    },
}

export default function LayoutTermsConsentToReceiveMailings({ children }: { children: ReactNode }) {
    return children
}
