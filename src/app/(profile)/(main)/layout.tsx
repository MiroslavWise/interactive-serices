import { type ReactNode } from "react"

import { ChangeService } from "@/components/profile"
import { DeleteOffer, DeleteUser } from "@/components/templates"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children, left, history }: Record<TRoutes, ReactNode>) {
  return (
    <div className={styles.containerProfile}>
      {left}
      {children}
      {history}
      <ChangeService />
      <DeleteOffer />
      <DeleteUser />
    </div>
  )
}

type TRoutes = "children" | "left" | "history"
