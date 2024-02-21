import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"
import { EnumTypeProvider } from "@/types/enum"

import { GeneralItem } from "@/components/common"

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
    return data?.res || []
  }, [data?.res])

  return (
    <ul data-items>
      {list?.map((item) => (
        <GeneralItem key={`::offer::general::${item.id}::`} offer={item} />
      ))}
    </ul>
  )
})
