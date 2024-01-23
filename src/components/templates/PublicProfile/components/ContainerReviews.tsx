import { memo, useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types/usersService"

import { serviceOffers } from "@/services/offers"
import { serviceTestimonials } from "@/services/testimonials"
import { CardReview } from "@/components/common/Card"

export const ContainerReviews = memo(function ContainerReviews(props: IUserResponse) {
    const { id } = props ?? {}

    const { data, isLoading } = useQuery({
        queryFn: () => serviceOffers.getUserId(id!, { provider: "offer" }),
        queryKey: ["offers", { userId: id, provider: "offer" }],
        enabled: !!id && typeof id !== "undefined",
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const idsOffers = useMemo(() => {
        if (data?.res && !isLoading) {
            return data?.res?.map((item) => item?.id)!
        }
        return []
    }, [data?.res, isLoading])

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

    console.log("listTestimonials: ", listTestimonials)

    return (
        <ul data-items>
            {listTestimonials.map((item) => (
                <CardReview {...item!} key={`${item?.id}-public`} />
            ))}
        </ul>
    )
})
