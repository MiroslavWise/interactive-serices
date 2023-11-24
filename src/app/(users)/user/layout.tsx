import { type Metadata } from "next"
import { type ReactNode } from "react"

import { NavBarUser } from "@/components/profile"

export const metadata: Metadata = {
    title: "Sheira - Юзер",
}

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }: { children: ReactNode }) {
    return (
        <main className={styles.profileLayout}>
            <NavBarUser />
            {children}
        </main>
    )
}
