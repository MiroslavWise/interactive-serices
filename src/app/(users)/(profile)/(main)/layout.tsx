"use client"

import { type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { HistoryExchangeOffers, LeftAsideProfile } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children }: { children: ReactNode }) {
    return (
        <div className={styles.containerProfile}>
            {!isMobile && <LeftAsideProfile />}
            {children}
            {!isMobile && <HistoryExchangeOffers />}
        </div>
    )
}
