import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IResponseOffers } from "@/services/offers/types"

import IconLike from "@/components/icons/IconLike"

import { useAuth } from "@/store"
import { getLikeTargetId, postLike, getLikes } from "@/services"

interface IProps {
  offer: IResponseOffers
}

export const ButtonLike = ({ offer }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id } = offer ?? {}
  const getId = () => getLikeTargetId("offer", id!)

  const {
    data: dataLikesMy,
    isLoading: isLoadingLikesMy,
    isPending: isPendingLikesMy,
  } = useQuery({
    queryFn: getLikes,
    queryKey: ["likes", { userId: userId }],
    enabled: !!userId,
    refetchOnMount: true,
  })

  const { data, isLoading, isPending } = useQuery({
    queryFn: getId,
    queryKey: ["likes", { provider: "offer", id: id }],
    enabled: !!id,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (!!data?.data) {
      setCount(data?.data || 0)
    }
  }, [data])

  useEffect(() => {
    if (userId && dataLikesMy?.data && id) {
      const isLike = dataLikesMy?.data?.some(
        (item) => Number(item?.id) === Number(id) && Number(item?.userId) === Number(userId) && item.provider === "offer",
      )

      setMyLike(isLike)
    }
  }, [userId, dataLikesMy?.data, id])

  function handle() {
    if (!loading && !!userId && !isLoading && !isLoadingLikesMy && !isPendingLikesMy && !isPending) {
      setLoading(true)
      postLike({
        id: id!,
        provider: "offer",
      }).then(async (response) => {
        setLoading(false)
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
      <span className={myLike ? "!text-text-accent" : "text-text-secondary"}>{count}</span>
    </button>
  )
}
