import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffers } from "@/services"

export const ContainerServices = memo(function ContainerServices(props: IUserResponse) {
    const { id } = props ?? {}

    const { data } = useQuery({
        queryFn: () => serviceOffers.getUserId(id!, { provider: "offer" }),
        queryKey: ["offers", { userId: id, provider: "offer" }],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const list = useMemo(() => {
        return data?.res || []
    }, [data?.res])

    return (
        <ul data-items>
            {list.map((item) => (
                <CardRequestsAndProposals key={`${item.id}-public-profile`} type="optional-3" {...item} />
            ))}
        </ul>
    )
})
