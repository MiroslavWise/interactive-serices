"use client"

import { ReactNode, useEffect } from "react"
import { isMobile } from "react-device-detect"

import { NavBarProfile } from "@/components/profile"

import { useAuth } from "@/store/hooks"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
    const { userId } = useAuth()
    const { handlePush } = usePush()

    useEffect(() => {
        if (userId) {
        } else {
            handlePush("/")
        }
    }, [userId, handlePush])

    return userId ? (
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
