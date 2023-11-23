import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Sheira - Профиль",
}

export default function LayoutProfile({ children }: { children: ReactNode }) {
    return children
}
