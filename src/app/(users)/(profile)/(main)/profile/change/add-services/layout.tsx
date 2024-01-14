import { type Metadata } from "next"
import { type ReactNode } from "react"

import styles from "./layout.module.scss"

export const metadata: Metadata = {
    title: "Добавление услуг",
    openGraph: {
        title: "Добавление услуг",
    },
    twitter: {
        title: "Добавление услуг",
    },
}

export default function LayoutAddServices({ children }: { children: ReactNode }) {
    return <div className={styles.wrapper}>{children}</div>
}
