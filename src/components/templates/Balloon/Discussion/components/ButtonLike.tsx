import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { IResponseOffers } from "@/services/offers/types"

import IconLike from "@/components/icons/IconLike"

import { useAuth_ } from "@/store"
import { serviceLikes } from "@/services"

interface IProps {
  offer: IResponseOffers
}

export const ButtonLike = ({ offer }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const { id } = offer ?? {}

  const {
    data: dataLikesMy,
    isLoading: isLoadingLikesMy,
    isPending: isPendingLikesMy,
  } = useQuery({
    queryFn: () => serviceLikes.get(),
    queryKey: ["likes", `user=${userId}`],
    enabled: !!userId,
    refetchOnMount: true,
  })

  const { data, isLoading, isPending } = useQuery({
    queryFn: () => serviceLikes.getTargetId("offer", id!),
    queryKey: ["likes", `provider=offer`, `id=${id}`],
    enabled: !!id,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (!!data?.res) {
      setCount(data?.res || 0)
    }
  }, [data])

  useEffect(() => {
    if (userId && dataLikesMy?.res && id) {
      const isLike = dataLikesMy?.res?.some(
        (item) => Number(item?.id) === Number(id) && Number(item?.userId) === Number(userId) && item.provider === "offer",
      )

      setMyLike(isLike)
    }
  }, [userId, dataLikesMy?.res, id])

  function handle() {
    if (!loading && !!userId && !isLoading && !isLoadingLikesMy && !isPendingLikesMy && !isPending) {
      setLoading(true)
      serviceLikes
        .post({
          id: id!,
          provider: "offer",
        })
        .then(async (response) => {
          setCount((_) => (myLike ? _ - 1 : _ + 1))
          setMyLike((_) => !_)
        })
    }
  }

  return (
    <button
      data-like={myLike}
      onClick={(event) => {
        event.stopPropagation()
        handle()
      }}
    >
      <IconLike is={myLike} />
      <span>{count}</span>
    </button>
  )
}
