import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Восстановление пароля",
    openGraph: {
        title: "Восстановление пароля",
    },
    appleWebApp: {
        title: "Восстановление пароля",
    },
}

export default function LayoutResetPassword({ children }: { children: ReactNode }) {
    return children
}
