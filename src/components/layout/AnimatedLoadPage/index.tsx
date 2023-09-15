"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { cx } from "@/lib/cx"
import { useAnimateLoadPage } from "@/store/hooks"

import styles from "./style.module.scss"

export function AnimatedLoadPage() {
    const pathname = usePathname()
    const pathSearchParams = useSearchParams()
    const [state, setState] = useState(pathname)
    const { isAnimated, setIsAnimated } = useAnimateLoadPage()

    useEffect(() => {
        if (pathname !== state) {
            setIsAnimated(false)
            setState(pathname)
        }
    }, [pathname, state, setIsAnimated])

    useEffect(() => {
        pathSearchParams.forEach((item, key) => {
            if (item && key) setIsAnimated(false)
        })
    }, [pathSearchParams, setIsAnimated])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
}
