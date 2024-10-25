import { type PropsWithChildren } from "react"

import { cx } from "@/lib/cx"

import styles from "./layout.module.scss"

export default ({ children }: PropsWithChildren) => (
  <main
    className={cx(
      styles.main,
      "w-full h-screen md:h-full flex flex-col items-center p-0 md:px-3 md:pt-[calc(var(--height-header-nav-bar)_+_1.25rem)] md:pb-5",
    )}
  >
    <section className="w-full h-full md:max-w-[1440px] flex flex-col items-center">{children}</section>
  </main>
)
