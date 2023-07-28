

import type { TNewServicesBanner } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({ active }) => {

  return (
    <div className={cx(styles.wrapper, active && styles.active)}>

    </div>
  )
}