"use client"

import dynamic from "next/dynamic"
import { isMobile } from "react-device-detect"

import { BannerServices, BannerSign, BannerAbout, MobileFilterMap } from "@/components/content"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const isAuth = useAuth(({ isAuth }) => isAuth)

    return (
        <main className={styles.main}>
            <YandexMap />
            {isAuth && <BannerSign />}
            {typeof isAuth !== "undefined" && !isAuth && <BannerAbout />}
            {isMobile && <MobileFilterMap />}
            <BannerServices />
        </main>
    )
}
