"use client"

import { type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { LeftAsideProfile } from "@/components/profile/LeftAsideProfile"
import { HistoryExchangeOffers } from "@/components/profile/HistoryExchangeOffers"

import { cx } from "@/lib/cx"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children }: { children: ReactNode }) {

  return (
    isMobile ? (
      <div className={cx(styles.page, isMobile && styles.mobile)}>
        <div className={cx(styles.containerProfile, isMobile && styles.mobile)}>
          {children}
        </div>
      </div>
    ) : (
      <div className={cx(styles.page, isMobile && styles.mobile)}>
        <div className={cx(styles.containerProfile, isMobile && styles.mobile)}>
          <LeftAsideProfile />
          {children}
          {typeof isMobile !== "undefined" && !isMobile ? <HistoryExchangeOffers /> : null}
        </div>
      </div>
    )
  )
}