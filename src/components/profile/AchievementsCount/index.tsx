"use client"

import { useMemo } from "react"
import { useQueries } from "react-query"

import { BadgeAchievements } from "@/components/common/Badge"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"
import { serviceTestimonials } from "@/services/testimonials"

import styles from "./style.module.scss"

export const AchievementsCount = () => {
    const { userId } = useAuth()

    const queries = useQueries([
        {
            queryFn: () =>
                serviceBarters.get({ user: userId!, status: "completed" }),
            queryKey: ["barters", `user=${userId}`, `status=completed`],
            enabled: !!userId,
        },
        {
            queryFn: () => serviceTestimonials.get({ user: userId! }),
            queryKey: ["testimonials", `user=${userId}`],
            enabled: !!userId,
        },
    ])

    const counts = useMemo(() => {
        const barters = queries?.[0]?.data?.res
        const testimonials = queries?.[1]?.data?.res

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
            completed: barters?.length || 0,
            average: rating() || 0,
        }
    }, [queries])

    return (
        <ul className={styles.container}>
            <BadgeAchievements
                classNames={[styles.badge]}
                title="Обмены закрыты"
                total={counts.completed.toFixed(0)}
                type="down"
            />
            <BadgeAchievements
                classNames={[styles.badge]}
                title="Обзор и рейтинг"
                total={counts.average.toFixed(1)}
                type="up"
            />
        </ul>
    )
}
