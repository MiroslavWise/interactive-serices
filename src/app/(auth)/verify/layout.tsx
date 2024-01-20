import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Верификация",
    openGraph: {
        title: "Верификация",
    },
    appleWebApp: {
        title: "Верификация",
    },
}

export default function LayoutVerify({ children }: { children: ReactNode }) {
    return children
}
