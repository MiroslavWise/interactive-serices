"use client"

import { redirect } from "next/navigation"
import { isMobile } from "react-device-detect"
import { useEffect, type ReactNode } from "react"

import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const isAuth = useAuth(({ isAuth }) => isAuth)

    useEffect(() => {
        if (typeof isAuth !== "undefined" && !isAuth) {
            redirect("/")
        }
    }, [isAuth])

    return isAuth ? isMobile ? children : <main className={styles.profileLayout}>{children}</main> : null
}
