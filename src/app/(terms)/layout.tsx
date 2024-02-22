import { type ReactNode } from "react"

import styles from "./layout-terms.module.scss"

export default function LayoutTerms({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <section>{children}</section>
    </div>
  )
}
