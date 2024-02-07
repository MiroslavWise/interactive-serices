import { ReactNode } from "react"
import { Manrope } from "next/font/google"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

const manrope = Manrope({ subsets: ["latin"], style: "normal" })

export default function LayoutPromo({ children }: { children: ReactNode }) {
  return <main className={cx(styles.wrapper, manrope.className)}>{children}</main>
}
