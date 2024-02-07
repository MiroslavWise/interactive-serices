import { useQuery } from "@tanstack/react-query"

import { getOffers } from "@/services"

export const useRefresh = () => {
  const { refetch } = useQuery({
    queryFn: () => getOffers({ order: "DESC" }),
    queryKey: ["offers"],
    enabled: false,
  })

  return refetch
}
