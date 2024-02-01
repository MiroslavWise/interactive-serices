import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types/usersService"

import { serviceTestimonials } from "@/services"
import { CardReview } from "@/components/common/Card"

export const ContainerReviews = memo(function ContainerReviews(props: IUserResponse) {
    const { id } = props ?? {}

    const { data: dataTestimonials, isLoading: isLoadingTestimonials } = useQuery({
        queryFn: () => serviceTestimonials.get({ receiver: id! }),
        queryKey: ["testimonials", { receiver: id }],
        enabled: !!id,
    })

    const list = useMemo(() => dataTestimonials?.res || [], [dataTestimonials?.res])

    return (
        <ul data-items>
            {list.map((item) => (
                <CardReview {...item!} key={`${item?.id}-public`} />
            ))}
        </ul>
    )
})
