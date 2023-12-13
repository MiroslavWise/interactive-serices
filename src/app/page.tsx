"use client"

import dynamic from "next/dynamic"

import { BannerServices, BannerSign, BannerAbout } from "@/components/content"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useAuth, useModalAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <main className={styles.main} data-is-modal-auth={visible}>
            <YandexMap />
            {isAuth ? <BannerSign /> : <BannerAbout />}
            <BannerServices />
        </main>
    )
}
