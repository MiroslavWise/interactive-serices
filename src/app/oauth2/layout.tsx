import { type Metadata } from "next"
import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

import styles from "./layout.module.scss"

export const metadata: Metadata = {
    title: {
        default: "Авторизация",
        template: "%s | Авторизация",
    },
    openGraph: {
        title: {
            default: "Авторизация",
            template: "%s | Авторизация",
        },
    },
}

export default function LayoutCallback({ children }: { children: ReactNode }) {
    return (
        <>
            <div className={cx("wrapper-fixed", styles.container)} data-visible>
                <img src="/svg/loading-02.svg" alt="loading" width={50} height={50} />
            </div>
            {children}
        </>
    )
}
