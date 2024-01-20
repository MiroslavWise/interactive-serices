import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Предложения",
    openGraph: { title: "Предложения" },
    twitter: { title: "Предложения" },
}

export default function LayoutOffersMe({ children }: { children: ReactNode }) {
    return <ul className="__container-offer-page__">{children}</ul>
}
