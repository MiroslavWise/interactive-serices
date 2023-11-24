import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Sheira - Предложения",
    description: `Новости, дискуссии, предложения, вызовы, срочное`,
}

export default function LayoutNews({ children }: { children: ReactNode }) {
    return children
}
