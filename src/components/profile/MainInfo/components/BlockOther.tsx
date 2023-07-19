
import type { TBlockOther } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BlockOther: TBlockOther = ({ label, children, classNames }) => {

  return (
    <div className={styles.container}>
      <p>{label}</p>
      <div className={cx(styles.items, classNames)}>{children }</div>
    </div>
  )
}