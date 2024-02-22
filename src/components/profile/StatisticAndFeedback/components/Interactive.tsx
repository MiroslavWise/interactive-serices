"use client"

import { useState } from "react"

import type { TInteractive } from "./types/types"
import type { TItemInteractive } from "../types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common"

import { ItemsReviews } from "./ItemsReviews"
import { ContainerServices } from "./ContainerServices"

import { ITEMS_INTERACTIVE } from "./constants"

import styles from "./styles/style.module.scss"

export const Interactive: TInteractive = ({}) => {
  const [active, setActive] = useState<ISegmentValues<TItemInteractive>>(ITEMS_INTERACTIVE[0])

  return (
    <section className={styles.interactive}>
      <nav>
        <Segments classNames={styles.segments} type="primary" VALUES={ITEMS_INTERACTIVE} active={active} setActive={setActive} isBorder />
      </nav>
      {active.value === "reviews" ? <ItemsReviews /> : active.value === "services" ? <ContainerServices /> : null}
    </section>
  )
}
