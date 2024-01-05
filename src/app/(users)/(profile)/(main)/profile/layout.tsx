import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
    title: "Профиль",
}

import styles from "@/components/profile/MyProfilePage/styles/style.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    return <ul className={styles.containerProfilePage}>{children}</ul>
}
