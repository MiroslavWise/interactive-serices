"use client"

import { Suspense } from "react"
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
            <Suspense fallback={false}>
                {isMobile ? (
                    children
                ) : (
                    <>
                        <NavBarProfile />
                        {children}
                    </>
                )}
            </Suspense>
        </main>
    ) : null
}
