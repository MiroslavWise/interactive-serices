"use client"

import { useState } from "react"

import { EnumStatusBarter } from "@/types/enum"
import { type ISegmentValues } from "@/components/common/Segments/types"

import { Header } from "./components/Header"
import { SentenceCards } from "./components/SentenceCards"

import { cx } from "@/lib/cx"
import { useBanner } from "@/store"
import { SEGMENTS } from "./constants"

import styles from "./style.module.scss"

export const HistoryExchangeOffers = ({}) => {
  const visible = useBanner(({ visible }) => visible)
  const [value, setValue] = useState<ISegmentValues<EnumStatusBarter>>(SEGMENTS[0])

  return (
    <aside
      className={cx(
        "fixed w-full max-w-[24.375rem] hidden md:flex flex-col gap-6 bg-BG-second z-[2] overflow-hidden rounded-[2rem] right-6 bottom-6 pt-5",
        visible ? styles.banner : styles.default,
      )}
    >
      <Header {...{ value, setValue }} />
      <SentenceCards {...{ value }} />
    </aside>
  )
}
