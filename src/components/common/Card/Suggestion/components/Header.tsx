import type { IHeader } from "./types/types"

import { Rate } from "@/components/common/Rate"

import styles from "./styles/style.module.scss"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { memo, useMemo } from "react"

const $Header: IHeader = ({ categoryId, rating, title, provider }) => {
    const { categories } = useOffersCategories()

    const titleCategory = useMemo(() => {
        return (
            categories?.find((item) => Number(item?.id) === Number(categoryId))
                ?.title || ""
        )
    }, [categories, categoryId])

    return (
        <header className={styles.containerHeader}>
            <section className={styles.nameAndRating}>
                <h4>{titleCategory}</h4>
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
                {["offer", "request"].includes(provider) ? (
                    <p>
                        {provider === "offer"
                            ? "Могу:"
                            : provider === "request"
                            ? "Хочу:"
                            : ""}
                    </p>
                ) : null}
                <p className={styles.textCan}>{title}</p>
            </section>
        </header>
    )
}

export const Header = memo($Header)
