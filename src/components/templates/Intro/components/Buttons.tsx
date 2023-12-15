"use client"

import { isMobile } from "react-device-detect"

import { dispatchIntro, useIntro, dispatchPrevIntro, dispatchNextIntro } from "@/store/hooks"

import styles from "../styles/button-close.module.scss"

export function ButtonClose() {
    return (
        <button
            className={styles.button}
            onClick={(event) => {
                event.stopPropagation()
                dispatchIntro(false)
            }}
        >
            <img src="/svg/x-close.svg" alt="x-close" width={20} height={20} />
        </button>
    )
}

export function ButtonsSwipePage() {
    const page = useIntro(({ page }) => page)

    return typeof isMobile !== "undefined" && !isMobile ? (
        <>
            <button
                className={styles.swipe}
                data-left
                data-opacity={page === 0}
                onClick={(event) => {
                    event.stopPropagation()
                    dispatchPrevIntro()
                }}
            >
                <img src="/svg/chevron-left.svg" alt="left" width={20} height={20} />
            </button>
            <button
                className={styles.swipe}
                data-right
                data-opacity={page >= 6}
                onClick={(event) => {
                    event.stopPropagation()
                    dispatchNextIntro()
                }}
            >
                <img src="/svg/chevron-right.svg" alt="left" width={20} height={20} />
            </button>
        </>
    ) : null
}
