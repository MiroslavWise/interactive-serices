"use client"

import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { TBadges } from "./types/types"

import { BadgeAchievementsBorder } from "@/components/common"

import { serviceBarters, getUserIdOffers, getTestimonials } from "@/services"

import styles from "./styles/style.module.scss"

export const Badges: TBadges = ({ id }) => {
  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id! }),
    queryKey: ["testimonials", { receiver: id }],
    enabled: !!id,
  })

  const ratting = useMemo(() => {
    let count = 0
    let sum = 0

    if (dataTestimonials?.res) {
      if (dataTestimonials?.res?.length === 0)
        return {
          rating: 0,
          count: 0,
        }
      dataTestimonials?.res?.forEach((item) => {
        if (item) {
          count += 1
          sum = sum + item.rating
        }
      })
    }

    return {
      rating: sum / count || 0,
      count: count,
    }
  }, [dataTestimonials?.res])

  const dataQueries = useQueries({
    queries: [
      {
        queryFn: () => getUserIdOffers(id!, { provider: "offer", order: "DESC" }),
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
    ],
  })

  const countProperties = useMemo(() => {
    const offers = dataQueries?.[0]?.data?.res
    const barters = dataQueries?.[1]?.data?.res

    return {
      proposals: offers?.length || 0,
      completed: barters?.length || 0,
    }
  }, [dataQueries])

  return (
    <section className={styles.budges}>
      <BadgeAchievementsBorder title="Предложения" total={countProperties.proposals.toFixed(0)} />
      <BadgeAchievementsBorder title="Обмены" total={countProperties.completed.toFixed(0)} />
      <BadgeAchievementsBorder title="Рейтинг" total={ratting.rating.toFixed(1)} />
      <BadgeAchievementsBorder title="Отзывы" total={ratting.count} />
    </section>
  )
}
