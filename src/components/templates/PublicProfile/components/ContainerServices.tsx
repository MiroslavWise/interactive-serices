import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"

import { CardRequestsAndProposals, GeneralServiceAllItem } from "@/components/common/Card"

import { getUserIdOffers } from "@/services"

export const ContainerServices = memo(function ContainerServices(props: IUserResponse) {
  const { id } = props ?? {}

  const { data } = useQuery({
    queryFn: () => getUserIdOffers(id!, { provider: "offer" }),
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
        <GeneralServiceAllItem key={`${item.id}-public-profile`} {...item} />
      ))}
    </ul>
  )
})
