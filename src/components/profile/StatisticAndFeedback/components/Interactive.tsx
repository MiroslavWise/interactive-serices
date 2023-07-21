"use client"

import { useState, useMemo, type ReactNode } from "react"

import type { TInteractive } from "./types/types"
import type { TItemInteractive } from "../types/types"

import { ITEMS_INTERACTIVE } from "./constants"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"
import { ItemsReviews } from "./ItemsReviews"
import { ItemsBlogMessages } from "./ItemsBlogMessages"
import { ItemsRequests } from "./ItemsRequests"
import { ItemsProposals } from "./ItemsProposals"

export const Interactive: TInteractive = ({ }) => {
  const [active, setActive] = useState<TItemInteractive>("reviews")

  const Items: ReactNode = useMemo(() => {
    return {
      reviews: <ItemsReviews />,
      blog_message: <ItemsBlogMessages />,
      requests: <ItemsRequests />,
      proposals: <ItemsProposals />,
    }[active]
  }, [active])

  return (
    <section className={styles.interactive}>
      <nav>
        <ul>
          {
            ITEMS_INTERACTIVE.map(item => (
              <li
                key={item.value}
                onClick={() => { setActive(item.value) }}
                className={cx(item.value === active && styles.active)}
              >
                <p>{item.label}</p>
              </li>
            ))
          }
        </ul>
      </nav>
      {Items}
    </section>
  )
}