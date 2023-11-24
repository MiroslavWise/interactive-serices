import { useMemo } from "react"

import type { IHeader } from "./types/types"

import { Rate } from "@/components/common/Rate"

import { useOffersCategories } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Header: IHeader = ({ categoryId, rating, title, provider }) => {
    const { categories } = useOffersCategories((_) => ({
        categories: _.categories,
    }))

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
                {rating ? (
                    <div className={styles.containerRate}>
                        <Rate
                            rate={rating?.average!}
                            className={styles.rateGap}
                            size={14}
                        />
                        <a>({rating?.total!})</a>
                    </div>
                ) : null}
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
