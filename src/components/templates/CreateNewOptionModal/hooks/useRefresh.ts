import { useQuery } from "@tanstack/react-query"

import { serviceOffers } from "@/services/offers"

export const useRefresh = () => {
    const { refetch } = useQuery({
        queryFn: () => serviceOffers.get({ order: "DESC" }),
        queryKey: ["offers"],
        enabled: false,
    })

    return refetch
}
