import { type ReactNode } from "react"

import { LeftAsideProfile } from "@/components/profile/LeftAsideProfile"
import { HistoryExchangeOffers } from "@/components/profile/HistoryExchangeOffers"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children }: { children: ReactNode }) {

  return (
    <div className={styles.page}>
      <div className={styles.containerProfile}>
        <LeftAsideProfile />
        {children}
        <HistoryExchangeOffers />
      </div>

    </div>
  )
}