import { useMemo } from "react"

import type { IHeader } from "./types/types"

import { Rate } from "@/components/common/Rate"

import { IconCategory } from "@/lib/icon-set"
import { useOffersCategories } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Header: IHeader = ({ rating, data }) => {
    const categories = useOffersCategories(({ categories }) => categories)

    const titleCategory = useMemo(() => {
        return categories?.find((item) => Number(item?.id) === Number(data?.categoryId))?.title || ""
    }, [categories, data?.categoryId])

    const descriptionCategory = (id: number) => categories?.find((item) => item?.id === id)?.title

    return (
        <header className={styles.containerHeader}>
            <section className={styles.nameAndRating}>
                <h4>{titleCategory}</h4>
                {rating ? (
                    <div className={styles.containerRate}>
                        <Rate rate={rating?.average!} className={styles.rateGap} size={14} />
                        <a>({rating?.total!})</a>
                    </div>
                ) : null}
            </section>
            <section className={styles.containerCanService}>
                {["offer", "request"].includes(data?.provider) ? (
                    <p>{data?.provider === "offer" ? "Могу:" : data?.provider === "request" ? "Хочу:" : ""}</p>
                ) : null}
                <p className={styles.textCan}>{data?.title}</p>
            </section>
            {data.categories.length ? (
                <article data-article-want>
                    <p>Хочу:</p>
                    {data.categories.map((item) => (
                        <div key={`::${item}::category::user::`} data-item>
                            <div data-img>
                                <img
                                    src={IconCategory(item)}
                                    alt={`${item}`}
                                    width={16}
                                    height={16}
                                    onError={(error: any) => {
                                        if (error?.target) {
                                            try {
                                                error.target.src = `/svg/category/default.svg`
                                            } catch (e) {
                                                console.log("catch e: ", e)
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <p>{descriptionCategory(item!)}</p>
                        </div>
                    ))}
                </article>
            ) : null}
        </header>
    )
}
