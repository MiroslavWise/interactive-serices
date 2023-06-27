import { TItemsBadges } from "./types"


import { BadgeAchievements } from "components/BadgeAchievements"

import styles from "./styles/style.module.scss"

const MOCKS_BADGES: { title: string, total: number }[] = [
        {
                title: "Доступные предложения",
                total: 24,
        },
        {
                title: "Биржи закрыты",
                total: 18,
        },
        {
                title: "Обзор и рейтинг",
                total: 4.5,
        },
] 

export const ItemsBadges: TItemsBadges = ({}) => {

        return (
                <section className={styles.itemsBadges}>
                        {
                                MOCKS_BADGES.map(item => (
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