"use client"

import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"

import type { TBadges } from "./types/types"

import { BadgeAchievementsBorder } from "@/components/common/Badge/BadgeAchievementsBorder"

import { serviceTestimonials, serviceBarters, serviceOffers } from "@/services"

import styles from "./styles/style.module.scss"

export const Badges: TBadges = ({ id }) => {
    const dataQueries = useQueries({
        queries: [
            {
                queryFn: () => serviceOffers.getUserId(id!, { provider: "offer", order: "DESC" }),
                queryKey: ["offers", { userId: id, provider: "offer" }],
                enabled: !!id,
            },
            {
                queryFn: () =>
                    serviceBarters.get({
                        user: id!,
                        status: "completed",
                        order: "DESC",
                    }),
                queryKey: ["barters", { userId: id, status: "completed" }],
                enabled: !!id,
            },
            {
                queryFn: () => serviceTestimonials.get({ user: id! }),
                queryKey: ["testimonials", { userId: id }],
                enabled: !!id,
            },
        ],
    })

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
            <BadgeAchievementsBorder title="Предложения" total={countProperties.proposals.toFixed(0)} />
            <BadgeAchievementsBorder title="Обмены" total={countProperties.completed.toFixed(0)} />
            <BadgeAchievementsBorder title="Рейтинг" total={countProperties.average.toFixed(1)} />
            <BadgeAchievementsBorder title="Отзывы" total={countProperties.testimonials.toFixed(0)} />
        </section>
    )
}
