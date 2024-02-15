import { type ReactNode } from "react"

import { DeleteOffer, DeleteUser } from "@/components/templates"

import styles from "@/scss/page.module.scss"

export default function LayoutMainProfile({ children, left, history }: Record<TRoutes, ReactNode>) {
  return (
    <div className={styles.containerProfile}>
      {left}
      {children}
      {history}
      <DeleteOffer />
    </div>
  )
}

type TRoutes = "children" | "left" | "history"
