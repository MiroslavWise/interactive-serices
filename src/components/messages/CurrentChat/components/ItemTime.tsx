import { memo } from "react"
import type { TItemTime } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/time.module.scss"

export const ItemTime: TItemTime = memo(function $ItemTime({ time }) {
  return (
    <div className={cx(styles.wrapper, "sticky")}>
      <article className={styles.container}>
        <span>{time}</span>
      </article>
    </div>
  )
})
