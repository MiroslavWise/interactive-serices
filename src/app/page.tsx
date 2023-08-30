import { YandexMap } from "@/components/YandexMap"
import { SignBanner } from "@/components/auth/Signin/SignBanner"
import { Profiles } from "@/components/auth/Profile"

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
