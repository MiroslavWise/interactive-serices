import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Telegram",
    icons: {
        icon: "/icons/fill/telegram.svg",
    },
    openGraph: {
        title: "Telegram",
    },
    appleWebApp: {
        title: "Telegram",
    },
}

export default function LayoutVK({ children }: { children: ReactNode }) {
    return children
}
