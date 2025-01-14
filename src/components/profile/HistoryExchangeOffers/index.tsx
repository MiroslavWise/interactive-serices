"use client"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const HistoryExchangeOffers = ({}) => {
  return (
    <aside
      className={cx(
        "fixed w-full max-w-[24.375rem] hidden md:flex flex-col gap-6 bg-BG-second z-[2] overflow-hidden rounded-2 right-6 bottom-6 pt-5",
        styles.default,
      )}
    >
      
    </aside>
  )
}
