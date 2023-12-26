import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Авторизация",
    openGraph: {
        title: "Авторизация",
    },
}

export default function LayoutCallback({ children }: { children: ReactNode }) {
    return children
}
