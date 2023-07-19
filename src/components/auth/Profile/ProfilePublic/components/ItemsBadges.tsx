import type { TItemsBadges } from "./types"

import { BadgeAchievements } from "@/components/common/Badge/BadgeAchievements"

import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ItemsBadges: TItemsBadges = ({ }) => {

  return (
    <section className={styles.itemsBadges}>
      {
        BADGES.map(item => (
          <BadgeAchievements
            key={item.title}
            title={item.title}
            total={item.total}
          />
        ))
      }
    </section>
  )
}