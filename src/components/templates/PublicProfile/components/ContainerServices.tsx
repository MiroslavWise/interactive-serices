import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"
import { EnumTypeProvider } from "@/types/enum"

import CardBallon from "@/components/common/Card/CardBallon"

import { getUserIdOffers } from "@/services"

export const ContainerServices = memo(function ContainerServices(props: IUserResponse) {
  const { id } = props ?? {}

  const { data } = useQuery({
    queryFn: () => getUserIdOffers(id!, { provider: EnumTypeProvider.offer }),
    queryKey: ["offers", { userId: id, provider: EnumTypeProvider.offer }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const list = useMemo(() => {
    return data?.data || []
  }, [data?.data])

  return (
    <ul data-items>
      {list?.map((item) => (
        <CardBallon key={`::offer::general::${item.id}::`} offer={item} />
      ))}
    </ul>
  )
})
