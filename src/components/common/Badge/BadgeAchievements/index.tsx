import type { TBadgeAchievements } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const BadgeAchievements: TBadgeAchievements = ({ title, total, classNames }) => {

  return (
    <div className={cx(styles.container, classNames)}>
      <div className={styles.titleAndNumber}>
        <p>{title}</p>
        <h2>{total}</h2>
      </div>
    </div>
  )
}