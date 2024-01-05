import { type ReactNode } from "react"

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }: { children: ReactNode }) {
    return (
        <main className={styles.profileLayout}>
            <div className={styles.page}>{children}</div>
        </main>
    )
}
