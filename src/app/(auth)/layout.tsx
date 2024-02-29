import { ReactNode } from "react"

import { cx } from "@/lib/cx"

import styles from "./layout.module.scss"

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={cx("wrapper-fixed", styles.container)} data-visible>
        <img src="/svg/spinner.svg" alt="loading" width={50} height={50} />
      </div>
      {children}
    </>
  )
}
