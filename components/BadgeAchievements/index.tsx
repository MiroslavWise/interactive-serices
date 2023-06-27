import type { TBadgeAchievements } from "./types"

import styles from "./style.module.scss"

export const BadgeAchievements: TBadgeAchievements = ({ title, total }) => {

        return (
                <div className={styles.container}>
                        <div className={styles.titleAndNumber}>
                                <p>{title}</p>
                                <h2>{total}</h2>
                        </div>
                </div>
        )
}