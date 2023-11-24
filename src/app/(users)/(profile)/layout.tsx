"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"

import { NavBarProfile } from "@/components/profile"

import { useAuth } from "@/store/hooks"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const isAuth = useAuth((_) => _.isAuth)
    const { handlePush } = usePush()

    useEffect(() => {
        if (typeof isAuth !== "undefined" && !isAuth) {
            handlePush("/")
        }
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
