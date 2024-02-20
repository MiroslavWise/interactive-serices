"use client"

import { useState } from "react"

import { EnumStatusBarter } from "@/types/enum"
import type { THistoryExchangeOffers } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Header } from "./components/Header"
import { SentenceCards } from "./components/SentenceCards"

import { SEGMENTS } from "./constants"

import styles from "./styles/style.module.scss"

export const HistoryExchangeOffers: THistoryExchangeOffers = ({}) => {
  const [value, setValue] = useState<ISegmentValues<EnumStatusBarter>>(SEGMENTS[0])

  return (
    <aside className={styles.container}>
      <Header {...{ value, setValue }} />
      <SentenceCards {...{ value }} />
    </aside>
  )
}
