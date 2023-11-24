"use client"

import { useInsertionEffect } from "react"
import { usePathname } from "next/navigation"

import { cx } from "@/lib/cx"
import { useAnimateLoadPage } from "@/store/hooks"

import styles from "./style.module.scss"

export function AnimatedLoadPage() {
    const pathname = usePathname()
    const { isAnimated, setIsAnimated } = useAnimateLoadPage((_) => ({
        isAnimated: _.isAnimated,
        setIsAnimated: _.setIsAnimated,
    }))

    useInsertionEffect(() => {
        setIsAnimated(false)
    }, [pathname])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
}
