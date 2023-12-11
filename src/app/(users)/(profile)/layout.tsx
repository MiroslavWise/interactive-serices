"use client"

import { isMobile } from "react-device-detect"
import { useEffect, type ReactNode } from "react"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const isAuth = useAuth(({ isAuth }) => isAuth)

    const { handlePush } = usePush()

    useEffect(() => {
        console.log("useInsertionEffect: ", isAuth)
        if (typeof isAuth !== "undefined" && !isAuth) {
            handlePush("/")
        }
    }, [isAuth, handlePush])

    return isAuth ? isMobile ? children : <main className={styles.profileLayout}>{children}</main> : null
}
