"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useQueries, useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TItemsReviews } from "./types/types"

import { CardReview } from "@/components/common/Card/Review"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"
import { serviceTestimonials } from "@/services/testimonials"

import styles from "./styles/style.module.scss"

export const ItemsReviews: TItemsReviews = ({}) => {
    const id = useSearchParams().get("id")
    const { data: dataOffers, isLoading } = useQuery({
        queryFn: () => serviceOffers.getUserId(Number(id!)),
        queryKey: ["offers", `user=${id}`],
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
            queryKey: ["testimonials", `offer=${item}`, `provider=offer`],
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

    return (
        <div className={cx(styles.containerItemsInteractive, isMobile && styles.mobile)}>
            {isMobile ? (
                <ul>
                    {listTestimonials.map((item) => (
                        <CardReview {...item!} key={`${item?.id}-card-review`} />
                    ))}
                </ul>
            ) : (
                <Masonry data-row columnsCount={2} gutter="16px">
                    {listTestimonials.map((item) => (
                        <CardReview {...item!} key={`${item?.id}-card-review`} />
                    ))}
                </Masonry>
            )}
        </div>
    )
}
