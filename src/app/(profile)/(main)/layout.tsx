import { type ReactNode } from "react"

import { ChangeService } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children, left, history }: Record<TRoutes, ReactNode>) {
  return (
    <div className={styles.containerProfile}>
      {left}
      {children}
      {history}
      <ChangeService />
    </div>
  )
}

type TRoutes = "children" | "left" | "history"
