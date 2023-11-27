"use client"

import { type ReactNode } from "react"

import { NavBarUser } from "@/components/profile"

import { useModalAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }: { children: ReactNode }) {
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <main className={styles.profileLayout} data-is-modal-auth={visible}>
            <NavBarUser />
            {children}
        </main>
    )
}
