"use client"

import { useEffect, useInsertionEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { cx } from "@/lib/cx"
import { useAnimateLoadPage } from "@/store/hooks"

import styles from "./style.module.scss"

export function AnimatedLoadPage() {
    const pathname = usePathname()
    const pathSearchParams = useSearchParams()
    const [state, setState] = useState(pathname)
    const { isAnimated, setIsAnimated } = useAnimateLoadPage()

    useInsertionEffect(() => {
        if (pathname !== state) {
            setIsAnimated(false)
            setState(pathname)
        }
    }, [pathname, state])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
}
