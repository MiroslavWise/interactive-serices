import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"

import { serviceLikes } from "@/services/likes"
import { useAuth, useBalloonDiscussion } from "@/store/hooks"
import IconLike from "@/components/icons/IconLike"

export const ButtonLike = () => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const userId = useAuth(({ userId }) => userId)
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { id } = offer ?? {}

  const [{ data: dataLikesMy, isLoading: isLoadingLikesMy }, { data, isLoading }] = useQueries({
    queries: [
      {
        queryFn: () => serviceLikes.get(),
        queryKey: ["likes", `user=${userId}`],
        enabled: !!userId,
        refetchOnMount: true,
      },
      {
        queryFn: () => serviceLikes.getTargetId("offer", id!),
        queryKey: ["likes", `provider=offer`, `id=${id}`],
        enabled: !!id,
        refetchOnMount: true,
      },
    ],
  })

  useEffect(() => {
    if (!!data?.res) {
      setCount(data?.res || 0)
    }
  }, [data])

  useEffect(() => {
    const isLike = !!dataLikesMy?.res?.some(
      (item) => Number(item?.id) === Number(id) && Number(item?.userId) === Number(userId) && item.provider === "offer",
    )

    if (isLike) {
      setMyLike(isLike)
    }
  }, [userId, dataLikesMy?.res, id])

  function handle() {
    if (!loading && !!userId && !isLoading && !isLoadingLikesMy) {
      setLoading(true)
      serviceLikes
        .post({
          id: id!,
          provider: "offer",
        })
        .then(async (response) => {
          if (response?.ok) {
            setCount(response?.res! || 0)
          }
          setMyLike((prev) => !prev)
          setLoading(false)
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
