"use client"

import { useEffect, type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { HistoryExchangeOffers, LeftAsideProfile } from "@/components/profile"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({
    children,
}: {
    children: ReactNode
}) {
    const { isAuth } = useAuth()
    const { handlePush } = usePush()

    useEffect(() => {
        if (typeof isAuth !== "undefined" && !isAuth) {
            handlePush("/")
        }
    }, [isAuth, handlePush])

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
        <div className={cx(styles.page)}>
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
