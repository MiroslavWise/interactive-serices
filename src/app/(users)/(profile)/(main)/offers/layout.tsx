import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Предложения",
}

import styles from "@/components/profile/OffersPage/styles/style.module.scss"

export default function LayoutOffersMe({ children }: { children: ReactNode }) {
    return <ul className={styles.wrapper}>{children}</ul>
}
