import { type ReactNode } from "react"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children, left, history }: Record<TRoutes, ReactNode>) {
    return (
        <div className={styles.containerProfile}>
            {left}
            {children}
            {history}
        </div>
    )
}

type TRoutes = "children" | "left" | "history"
