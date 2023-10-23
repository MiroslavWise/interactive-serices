"use client"

import { useQueries } from "react-query"
import { useSearchParams } from "next/navigation"

import type { TBadges } from "./types/types"

import { BadgeAchievementsBorder } from "@/components/common/Badge/BadgeAchievementsBorder"

import styles from "./styles/style.module.scss"
import { serviceBarters } from "@/services/barters"
import { serviceTestimonials } from "@/services/testimonials"
import { serviceOffers } from "@/services/offers"
import { useMemo } from "react"

export const Badges: TBadges = () => {
    const id = useSearchParams()?.get("id")

    const dataQueries = useQueries([
        {
            queryFn: () => serviceOffers.getUserId(Number(id)),
            queryKey: ["offers", `user=${id}`],
            enabled: !!id,
        },
        {
            queryFn: () =>
                serviceBarters.get({ user: Number(id), status: "completed" }),
            queryKey: ["barters", `user=${id}`],
            enabled: !!id,
        },
        {
            queryFn: () => serviceTestimonials.get({ user: Number(id) }),
            queryKey: ["testimonials", `user=${Number(id)}`],
            enabled: !!id,
        },
    ])

    const countProperties = useMemo(() => {
        const offers = dataQueries?.[0]?.data?.res
        const barters = dataQueries?.[1]?.data?.res
        const testimonials = dataQueries?.[2]?.data?.res

        const rating = () => {
            let quantity = 0
            let summer: number = 0

            testimonials?.forEach((item) => {
                if (item?.rating) {
                    quantity++
                    summer += Number(item.rating)
                }
            })

            return summer / quantity
        }

        return {
            proposals: offers?.length || 0,
            completed: barters?.length || 0,
            average: rating() || 0,
            testimonials: testimonials?.length || 0,
        }
    }, [dataQueries])

    return (
        <section className={styles.budges}>
            <BadgeAchievementsBorder
                title="Предложения"
                total={countProperties.proposals.toFixed(0)}
            />
            <BadgeAchievementsBorder
                title="Обмены"
                total={countProperties.completed.toFixed(0)}
            />
            <BadgeAchievementsBorder
                title="Рейтинг"
                total={countProperties.average.toFixed(1)}
            />
            <BadgeAchievementsBorder
                title="Отзывы"
                total={countProperties.testimonials.toFixed(0)}
            />
        </section>
    )
}
