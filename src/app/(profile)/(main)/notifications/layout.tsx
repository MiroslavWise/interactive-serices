import { type Metadata } from "next"
import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

export const metadata: Metadata = {
  title: "Уведомления",
  openGraph: { title: "Уведомления" },
  twitter: { title: "Уведомления" },
}

import styles from "./layout.module.scss"
import main from "../layout.module.scss"

export default function LayoutNotification({ children }: { children: ReactNode }) {
  return <section className={cx(main.wrapperInsideContainer, styles.wrapper)}>{children}</section>
}
