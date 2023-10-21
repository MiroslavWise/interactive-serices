import { Badges } from "./components/Budges"
import { Interactive } from "./components/Interactive"

import styles from "./styles/style.module.scss"

export const StatisticAndFeedback = () => {
    return (
        <div className={styles.container}>
            <Badges />
            <Interactive />
        </div>
    )
}
