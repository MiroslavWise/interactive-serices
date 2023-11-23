import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Sheira - Сообщения",
}

export default function LayoutMessages({ children }: { children: ReactNode }) {
    return children
}
