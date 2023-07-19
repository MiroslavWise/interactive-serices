import { Badges } from "./components/Budges"
import { Interactive } from "./components/Interactive"

import styles from "./styles/style.module.scss"

export const StatisticAndFeedback = () => {

  return (
    <div className={styles.container}>
      <Badges
        {...{
          proposals: 24,
          closedExchanges: 18,
          rating: 4.5,
        }}
      />
      <Interactive
        
      />
    </div>
  )
}