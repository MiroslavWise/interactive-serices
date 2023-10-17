import type { TBadges } from "./types/types"

import styles from "./styles/style.module.scss"
import { BadgeAchievementsBorder } from "@/components/common/Badge/BadgeAchievementsBorder"

export const Badges: TBadges = ({ proposals, closedExchanges, rating }) => {
    return (
        <section className={styles.budges}>
            <BadgeAchievementsBorder
                title="Доступные предложения"
                total={proposals}
            />
            <BadgeAchievementsBorder
                title="Обмены закрыты"
                total={closedExchanges}
            />
            <BadgeAchievementsBorder title="Обзор и рейтинг" total={rating} />
        </section>
    )
}
