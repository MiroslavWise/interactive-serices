"use client"

import { useQueries, useQuery } from "react-query"
import { isMobile } from "react-device-detect"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { TItemsReviews } from "./types/types"

import { CardReview } from "@/components/common/Card/Review"
import { MotionUL } from "@/components/common/Motion"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { serviceOffers } from "@/services/offers"
import { serviceTestimonials } from "@/services/testimonials"

export const ItemsReviews: TItemsReviews = ({}) => {
    const id = useSearchParams().get("id")
    const { data: dataOffers } = useQuery({
        queryFn: () => serviceOffers.getUserId(Number(id!)),
        queryKey: ["offers", `user=${id}`],
        enabled: !!id && typeof id !== "undefined",
    })

    const idsOffers = useMemo(() => {
        if (!dataOffers?.res) {
            return []
        }
        if (dataOffers?.res) {
            return dataOffers?.res?.map((item) => item?.id)!
        }
        return []
    }, [dataOffers?.res])

    const dataTestimonials = useQueries(
        idsOffers.map((item) => ({
            queryFn: () =>
                serviceTestimonials.get({ target: item!, provider: "offer" }),
            queryKey: ["testimonials", `offer=${item}`, `provider=offer`],
            enabled: Array.isArray(idsOffers) && !!idsOffers?.length && !!id,
        })),
    )

    const listTestimonials = useMemo(() => {
        if (dataTestimonials?.some((item) => !item?.isLoading)) {
            return dataTestimonials?.map((item) => item?.data?.res)?.flat()!
        } else {
            return []
        }
    }, [dataTestimonials])

    console.log("listTestimonials: ", listTestimonials)

    return (
        <div
            className={cx(
                styles.containerItemsInteractive,
                isMobile && styles.mobile,
            )}
        >
            <MotionUL>
                {listTestimonials.map((item) => (
                    <CardReview {...item!} key={`${item?.id}-card-review`} />
                ))}
            </MotionUL>
        </div>
    )
}
