import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Sheira | Предложения",
}

export default function LayoutOffersMe({ children }: { children: ReactNode }) {
    return children
}
