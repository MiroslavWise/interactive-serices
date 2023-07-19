"use client"

import { useState } from "react"

import type { TInteractive } from "./types/types"
import type { TItemInteractive } from "../types/types"

import { ITEMS_INTERACTIVE } from "./constants"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"
import { ItemsInteractiveComponent } from "./ItemsInteractiveComponent"

export const Interactive: TInteractive = ({ }) => {
  const [active, setActive] = useState<TItemInteractive>("reviews")

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
      <ItemsInteractiveComponent />
    </section>
  )
}