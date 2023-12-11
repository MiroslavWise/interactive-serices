"use client"

import dynamic from "next/dynamic"

import { BannerServices, BannerSign } from "@/components/content"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useModalAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <main className={styles.main} data-is-modal-auth={visible}>
            <YandexMap />
            <BannerSign />
            <BannerServices />
        </main>
    )
}
