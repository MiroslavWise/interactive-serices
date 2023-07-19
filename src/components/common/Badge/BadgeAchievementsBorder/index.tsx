import type { TBadgeAchievements } from "../types/types"

import styles from "./style.module.scss"

export const BadgeAchievementsBorder: TBadgeAchievements = ({ title, total }) => {

  return (
    <div className={styles.container}>
      <div className={styles.titleAndNumber}>
        <p>{title}</p>
        <h2>{total}</h2>
      </div>
    </div>
  )
}