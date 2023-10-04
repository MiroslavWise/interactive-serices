import type { IHeader } from "./types/types"

import { Rate } from "@/components/common/Rate"

import styles from "./styles/style.module.scss"

export const Header: IHeader = ({ name, can, rating }) => {
    return (
        <header className={styles.containerHeader}>
            <section className={styles.nameAndRating}>
                <h4>{name}</h4>
                <div className={styles.containerRate}>
                    <Rate
                        rate={rating.average}
                        className={styles.rateGap}
                        size={14}
                    />
                    <a>({rating.total})</a>
                </div>
            </section>
            <section className={styles.containerCanService}>
                <p>Могу:</p>
                <p className={styles.textCan}>{can}</p>
            </section>
        </header>
    )
}
