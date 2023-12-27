"use client"

import { redirect } from "next/navigation"
import { isMobile } from "react-device-detect"
import { useEffect, type ReactNode } from "react"

import { useAuth } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"

import styles from "@/scss/page.module.scss"

// const MESSAGE_RANDOM = []

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const { on } = useToast()

    useEffect(() => {
        if (typeof isAuth !== "undefined" && !isAuth) {
            redirect("/")
        }
    }, [isAuth])

    // useEffect(() => {
    //     const timeOut = setTimeout(() => {
    //         on({

    //         }, )
    //     })

    //     return () => clearTimeout(timeOut)
    // }, [])

    return isAuth ? isMobile ? children : <main className={styles.profileLayout}>{children}</main> : null
}
