"use client"

import { useInsertionEffect } from "react"
import { usePathname } from "next/navigation"

import { useAnimateLoadPage, dispatchAnimated } from "@/store"

import styles from "./style.module.scss"

export function AnimatedLoadPage() {
    const pathname = usePathname()
    const isAnimated = useAnimateLoadPage(({ isAnimated }) => isAnimated)

    useInsertionEffect(() => {
        dispatchAnimated(false)
    }, [pathname])

    return (
        <div className={styles.wrapper} data-active={isAnimated}>
            <div className={styles.container} />
        </div>
    )
}
