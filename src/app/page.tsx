"use client"

import dynamic from "next/dynamic"
import { isMobile } from "react-device-detect"

import { NavBarProfile } from "@/components/profile"
import { Profiles } from "@/components/auth/Profile"
import { SignBanner } from "@/components/auth/Signin/SignBanner"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function Home() {
    const { token } = useAuth()

    return (
        <main className={styles.main}>
            {!isMobile && token ? <NavBarProfile /> : null}
            <YandexMap />
            <SignBanner />
            <Profiles />
        </main>
    )
}
