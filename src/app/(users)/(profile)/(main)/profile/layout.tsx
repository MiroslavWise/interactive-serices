import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Профиль",
    openGraph: { title: "Профиль" },
    twitter: { title: "Профиль" },
}

export default function LayoutProfile({ children }: { children: ReactNode }) {
    return <ul className="__container-profile-page__">{children}</ul>
}
