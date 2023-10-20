import Image from "next/image"
import type { TBadgeAchievements } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const BadgeAchievements: TBadgeAchievements = ({
    title,
    total,
    classNames,
    type,
}) => {
    return (
        <div className={cx(styles.container, classNames)}>
            <div className={styles.titleAndNumber}>
                <p>{title}</p>
                <section>
                    <h2>{total}</h2>
                    <Image
                        src={`/svg/arrow-${type}.svg`}
                        alt="up"
                        width={20}
                        height={20}
                    />
                </section>
            </div>
        </div>
    )
}
