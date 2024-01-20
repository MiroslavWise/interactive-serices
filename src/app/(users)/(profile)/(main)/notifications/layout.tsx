import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Уведомления",
    openGraph: { title: "Уведомления" },
    twitter: { title: "Уведомления" },
}

import styles from "./layout.module.scss"

export default function LayoutNotification({ children }: { children: ReactNode }) {
    return <section className={styles.wrapper}>{children}</section>
}
