"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useQueries, useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TItemsReviews } from "./types/types"

import { LoadingFeedback } from "@/components/common"
import { CardReview } from "@/components/common/Card/Review"

import { serviceTestimonials, serviceOffers } from "@/services"

import styles from "./styles/style.module.scss"

export const ItemsReviews: TItemsReviews = ({}) => {
    const id = useSearchParams().get("id")

    const { data: dataOffers, isLoading } = useQuery({
        queryFn: () => serviceOffers.getUserId(id!, { provider: "offer" }),
        queryKey: ["offers", { userId: id, provider: "offer" }],
        enabled: !!id && typeof id !== "undefined",
    })

    const idsOffers = useMemo(() => {
        if (dataOffers?.res && !isLoading) {
            return dataOffers?.res?.map((item) => item?.id)!
        }
        return []
    }, [dataOffers?.res, isLoading])

    const dataTestimonials = useQueries({
        queries: idsOffers.map((item) => ({
            queryFn: () => serviceTestimonials.get({ target: item!, provider: "offer" }),
            queryKey: ["testimonials", { targetId: item, provider: "offer" }],
            enabled: Array.isArray(idsOffers) && !!idsOffers?.length && !!id,
        })),
    })

    const listTestimonials = useMemo(() => {
        if (dataTestimonials?.every((item) => !item?.isLoading)) {
            return dataTestimonials?.map((item) => item?.data?.res)?.flat()!
        } else {
            return []
        }
    }, [dataTestimonials])

    const isLoadAll = useMemo(() => {
        return isLoading || dataTestimonials?.some((item) => item.isLoading)
    }, [isLoading, dataTestimonials])

    return (
        <div className={styles.containerItemsInteractive} data-loading={isLoadAll}>
            {isLoadAll ? (
                [1, 2, 3, 4].map((item) => <LoadingFeedback key={`::item::load::feedback::${item}`} />)
            ) : isMobile ? (
                <ul>
                    {listTestimonials.map((item) => (
                        <CardReview {...item!} key={`::card::review::${item?.id}::`} />
                    ))}
                </ul>
            ) : (
                <Masonry data-row columnsCount={2} gutter="16px">
                    {listTestimonials.map((item) => (
                        <CardReview {...item!} key={`::card::review::${item?.id}::`} />
                    ))}
                </Masonry>
            )}
            {}
        </div>
    )
}
