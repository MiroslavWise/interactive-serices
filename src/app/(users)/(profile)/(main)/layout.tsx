"use client"

import { type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { HistoryExchangeOffers, LeftAsideProfile } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children }: { children: ReactNode }) {
    return (
        <div className={styles.page}>
            {isMobile ? (
                <div className={styles.containerProfile}>{children}</div>
            ) : (
                <div className={styles.containerProfile}>
                    <LeftAsideProfile />
                    {children}
                    <HistoryExchangeOffers />
                </div>
            )}
        </div>
    )
}
