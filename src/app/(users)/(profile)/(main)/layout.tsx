"use client"

import { type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { HistoryExchangeOffers, LeftAsideProfile } from "@/components/profile"

import { cx } from "@/lib/cx"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({
    children,
}: {
    children: ReactNode
}) {
    return isMobile ? (
        <div className={cx(styles.page, isMobile && styles.mobile)}>
            <div
                className={cx(
                    styles.containerProfile,
                    isMobile && styles.mobile,
                )}
            >
                {children}
            </div>
        </div>
    ) : (
        <div className={cx(styles.page, isMobile && styles.mobile)}>
            <div
                className={cx(
                    styles.containerProfile,
                    isMobile && styles.mobile,
                )}
            >
                <LeftAsideProfile />
                {children}
                <HistoryExchangeOffers />
            </div>
        </div>
    )
}
