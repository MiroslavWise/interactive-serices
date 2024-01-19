import { type Metadata } from "next"
import { type ReactNode } from "react"

import styles from "./layout.module.scss"

export const metadata: Metadata = {
    title: {
        default: "Редактирование профиля",
        template: "%s | Sheira",
    },
    openGraph: {
        title: {
            default: "Редактирование профиля",
            template: "%s | Sheira",
        },
    },
    twitter: {
        title: {
            default: "Редактирование профиля",
            template: "%s | Sheira",
        },
    },
}

export default function LayoutChange({ children }: { children: ReactNode }) {
    return (
        <div className={styles.wrapper} data-blur-modal>
            {children}
        </div>
    )
}
