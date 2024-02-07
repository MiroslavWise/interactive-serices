"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TItemsReviews } from "./types/types"

import { LoadingFeedback } from "@/components/common"
import { CardReview } from "@/components/common/Card/Review"

import { getTestimonials } from "@/services"

import styles from "./styles/style.module.scss"

export const ItemsReviews: TItemsReviews = ({}) => {
  const id = useSearchParams().get("id")

  const { data: dataTestimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id! }),
    queryKey: ["testimonials", { receiver: id }],
    enabled: !!id,
  })

  const list = useMemo(() => dataTestimonials?.res || [], [dataTestimonials?.res])

  return (
    <div className={styles.containerItemsInteractive} data-loading={isLoadingTestimonials}>
      {isLoadingTestimonials ? (
        [1, 2, 3, 4].map((item) => <LoadingFeedback key={`::item::load::feedback::${item}`} />)
      ) : isMobile ? (
        <ul>
          {list.map((item) => (
            <CardReview {...item!} key={`::card::review::${item?.id}::`} />
          ))}
        </ul>
      ) : (
        <Masonry data-row columnsCount={2} gutter="16px">
          {list.map((item) => (
            <CardReview {...item!} key={`::card::review::${item?.id}::`} />
          ))}
        </Masonry>
      )}
      {}
    </div>
  )
}
