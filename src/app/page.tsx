"use client"

import dynamic from "next/dynamic"

import { NavBarProfile } from "@/components/profile"
import { BannerServices, BannerSign } from "@/components/content"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useAuth, useModalAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const is = useAuth(({ isAuth }) => isAuth)
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <main className={styles.main} data-is-modal-auth={visible}>
            {is && <NavBarProfile />}
            <YandexMap />
            <BannerSign />
            <BannerServices />
        </main>
    )
}
