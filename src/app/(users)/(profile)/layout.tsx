"use client"

import { isMobile } from "react-device-detect"
import { type ReactNode, useEffect } from "react"

import { NavBarProfile } from "@/components/profile"

import { useAuth } from "@/store/hooks"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const { is } = useAuth((_) => ({ is: _.isAuth }))
    const { handlePush } = usePush()

    useEffect(() => {
        console.log("useInsertionEffect: ", is)
        if (typeof is !== "undefined" && !is) {
            handlePush("/")
        }
    }, [is, handlePush])

    return is ? (
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
