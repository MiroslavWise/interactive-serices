import dynamic from "next/dynamic"

import { Profiles } from "@/components/auth/Profile"
import { SignBanner } from "@/components/auth/Signin/SignBanner"
const YandexMap = dynamic(() => import("../components/YandexMap"), {
    ssr: false,
})

import styles from "@/scss/page.module.scss"

export default function Home() {
    return (
        <main className={styles.main}>
            <YandexMap />
            <SignBanner />
            <Profiles />
        </main>
    )
}
