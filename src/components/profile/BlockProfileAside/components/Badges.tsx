import { TBadges } from "./types/types"

import { BadgeAchievements } from "@/components/common/Badge"

import styles from "./styles/style.module.scss"

export const Badges: TBadges = ({ }) => {

  return (
    <section className={styles.badges}>
      <BadgeAchievements
        title="Обмены закрыты"
        total={18}
      />
      <BadgeAchievements
        title="Обзор и рейтинг"
        total={4.5}
      />
    </section>
  )
}