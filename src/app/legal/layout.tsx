import { type PropsWithChildren } from "react"

import { cx } from "@/lib/cx"

import styles from "./layout.module.scss"

export default ({ children }: PropsWithChildren) => (
  <main className={cx(styles.main, "w-full h-screen md:h-full flex flex-col items-center px-3")}>
    <section className="w-full h-full md:max-w-[1440px] flex flex-col items-center py-5">{children}</section>
  </main>
)
