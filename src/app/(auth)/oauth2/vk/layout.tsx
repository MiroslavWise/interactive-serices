import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "ВКонтакте",
    icons: {
        icon: "/icons/fill/vk.svg",
    },
    openGraph: {
        title: "ВКонтакте",
    },
    appleWebApp: {
        title: "ВКонтакте",
    },
}

export default function LayoutVK({ children }: { children: ReactNode }) {
    return children
}
