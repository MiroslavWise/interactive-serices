import { type ReactNode, Suspense } from "react"

import { NavBarUser } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }: { children: ReactNode }) {
    return (
        <main className={styles.profileLayout}>
            <Suspense fallback={false}>
                <NavBarUser />
            </Suspense>
            {children}
        </main>
    )
}
