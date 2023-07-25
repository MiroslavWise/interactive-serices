import type { TButtonRadio } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonRadio: TButtonRadio = ({ active, label, onClick }) => {

  return (
    <div
      className={cx(styles.containerRadio, active && styles.active)}
      onClick={() => { if (onClick) onClick() }}
    >
      <div className={styles.radio}><span /></div>
      <p>{label}</p>
    </div>
  )
}