import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Sheira | Общие положения",
    description: "Политика Оператора в отношении обработки персональных данных",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    appleWebApp: {
        title: "Sheira | Общие положения",
        statusBarStyle: "default",
    },
    category: "policy, terms",
    openGraph: {
        title: "Sheira | Общие положения",
        description: "Политика Оператора в отношении обработки персональных данных",
    },
}

export default function LayoutTermsPolicy({ children }: { children: ReactNode }) {
    return children
}
