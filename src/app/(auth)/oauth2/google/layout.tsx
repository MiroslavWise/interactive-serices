import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Google",
    icons: {
        icon: "/icons/fill/google.svg",
    },
    openGraph: {
        title: "Google",
    },
    appleWebApp: {
        title: "Google",
    },
}

export default function LayoutGoogle({ children }: { children: ReactNode }) {
    return children
}
