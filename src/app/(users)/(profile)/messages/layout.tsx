import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Сообщения",
}

export default function LayoutMessages({ children }: { children: ReactNode }) {
    return children
}
