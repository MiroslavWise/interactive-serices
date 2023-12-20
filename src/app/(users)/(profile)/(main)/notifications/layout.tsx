import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Уведомления",
}

export default function LayoutNotification({ children }: { children: ReactNode }) {
    return children
}
