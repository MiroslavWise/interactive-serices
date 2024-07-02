"use client"

import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"

import type { TItemsBadges } from "../types/types"

import { BadgeAchievementsBorder } from "@/components/common/Badge/BadgeAchievementsBorder"

import { getUserIdOffers, getBarters, getTestimonials } from "@/services"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

export const ItemsBadges: TItemsBadges = ({ id }) => {
  const dataQueries = useQueries({
    queries: [
      {
        queryFn: () => getUserIdOffers(id, { provider: EnumTypeProvider.offer, order: "DESC" }),
        queryKey: ["offers", { userId: id, provider: EnumTypeProvider.offer }],
        enabled: !!id,
      },
      {
        queryFn: () =>
          getBarters({
            user: id,
            status: EnumStatusBarter.COMPLETED,
            order: "DESC",
          }),
        queryKey: ["barters", { userId: id, status: EnumStatusBarter.COMPLETED }],
        enabled: !!id,
      },
      {
        queryFn: () => getTestimonials({ receiver: id!, order: "DESC" }),
        queryKey: ["testimonials", { receiver: id, order: "DESC" }],
        enabled: !!id,
      },
    ],
  })

  const countProperties = useMemo(() => {
    const offers = dataQueries?.[0]?.data?.data
    const barters = dataQueries?.[1]?.data?.res
    const testimonials = dataQueries?.[2]?.data?.res

    const rating = () => {
      let quantity = 0
      let summer: number = 0

      testimonials?.forEach((item) => {
        quantity++
        summer += Number(item.rating)
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

  const isLoading = useMemo(() => {
    return dataQueries.map((item) => item.isLoading).some((item) => !!item)
  }, [dataQueries])

  return (
    <section data-budges data-opacity={!isLoading}>
      <BadgeAchievementsBorder title="Предложения" total={countProperties.proposals.toFixed(0)} />
      <BadgeAchievementsBorder title="Обмены" total={countProperties.completed.toFixed(0)} />
      <BadgeAchievementsBorder title="Рейтинг" total={countProperties.average.toFixed(1)} />
      <BadgeAchievementsBorder title="Отзывы" total={countProperties.testimonials.toFixed(0)} />
    </section>
  )
}
