import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: {
        default: "Профиль",
        template: "%s | Sheira",
    },
    openGraph: {
        title: {
            default: "Профиль",
            template: "%s | Sheira",
        },
    },
    twitter: {
        title: {
            default: "Профиль",
            template: "%s | Sheira",
        },
    },
}

import styles from "@/components/profile/MyProfilePage/styles/style.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    return <ul className={styles.containerProfilePage}>{children}</ul>
}
