import { Badges } from "./components/Budges"
import { Interactive } from "./components/Interactive"

import styles from "./styles/style.module.scss"

export const StatisticAndFeedback = ({ id }: { id: string }) => {
    return (
        <div className={styles.container}>
            <Badges id={id} />
            <Interactive />
        </div>
    )
}
