import { YandexMap } from "@/components/YandexMap"
import { Signin } from "@/components/auth/Signin"
import { Profiles } from "@/components/auth/Profile"

import styles from "@/scss/page.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <YandexMap />
      <Signin />
      <Profiles />
    </main>
  )
}
