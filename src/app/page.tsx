"use client"

import dynamic from "next/dynamic"

import { NavBarProfile } from "@/components/profile"
import { BannerServices, BannerSign } from "@/components/content"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const { token } = useAuth()

    return (
        <main className={styles.main}>
            {token ? <NavBarProfile /> : null}
            <YandexMap />
            <BannerSign />
            <BannerServices />
        </main>
    )
}
