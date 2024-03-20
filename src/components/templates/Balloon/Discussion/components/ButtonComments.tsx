import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import IconComment from "@/components/icons/IconComment"

import { serviceComments, serviceOffersThreads } from "@/services"

interface IProps {
  id: number
}

export const ButtonComments = ({ id }: IProps) => {
  const { data: dataOffersThreads } = useQuery({
    queryFn: () =>
      serviceOffersThreads.get({
        offer: id!,
      }),
    queryKey: ["offers-threads", id!],
    enabled: !!id!,
  })

  const currentOffersThreads = useMemo(
    () => dataOffersThreads?.res?.find((item) => item?.offerId === id) || null,
    [dataOffersThreads?.res, id],
  )

  const { data: dataComments } = useQuery({
    queryFn: () => serviceComments.get({ offer: currentOffersThreads?.id! }),
    queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
    enabled: !!currentOffersThreads?.id!,
  })

  const length = dataComments?.res?.length || 0

  return (
    <button type="button">
      <IconComment />
      <span>{length}</span>
    </button>
  )
}
