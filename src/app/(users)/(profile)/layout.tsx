"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useInsertionEffect } from "react"

import { NavBarProfile } from "@/components/profile"

import { useAuth } from "@/store/hooks"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const isAuth = useAuth((state) => state.isAuth)
    const { handlePush } = usePush()

    useInsertionEffect(() => {
        console.log("LayoutProfile start")
        let num = 0
        if (typeof isAuth !== "undefined" && !isAuth) {
            console.log("LayoutProfile handlePush")
            handlePush("/")
            num += 1
        }
        console.log("LayoutProfile num ", num)
        console.log("LayoutProfile isAuth ", isAuth)
        console.log("LayoutProfile end")
    }, [isAuth, handlePush])

    return isAuth ? (
        <main className={styles.profileLayout}>
            {isMobile ? (
                children
            ) : (
                <>
                    <NavBarProfile />
                    {children}
                </>
            )}
        </main>
    ) : null
}
