import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Политикой конфиденциальности",
    description: "Политика Оператора в отношении обработки персональных данных",
    keywords: ["sheira", "Шейра", "услуги", "товары", "обмен", "новости"],
    appleWebApp: {
        title: "Политикой конфиденциальности",
        statusBarStyle: "default",
    },
    category: "policy, terms",
    openGraph: {
        title: "Политикой конфиденциальности",
        description: "Политика Оператора в отношении обработки персональных данных",
    },
}

export default function LayoutTermsPolicy({ children }: { children: ReactNode }) {
    return children
}
