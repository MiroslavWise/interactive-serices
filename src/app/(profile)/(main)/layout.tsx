import { type ReactNode } from "react"

import { DeleteOffer } from "@/components/templates"
import { ChangeService } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children, left, history }: Record<TRoutes, ReactNode>) {
  return (
    <div className={styles.containerProfile}>
      {left}
      {children}
      {history}
      <ChangeService />
      <DeleteOffer />
    </div>
  )
}

type TRoutes = "children" | "left" | "history"
