import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumSign } from "@/types/enum"

import IconLike from "@/components/icons/IconLike"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthModal, useAuth } from "@/store"
import { getLikes, getLikeTargetId, postLike } from "@/services"

interface IProps {
  id: number
}

function ComponentButtonLike({ id }: IProps) {
  const { on } = useToast()
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const getId = () => getLikeTargetId("post", id!)
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [errorLike, setErrorLike] = useState(false)

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
    queryKey: ["likes", { provider: "post", id: id }],
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
        (item) => item.provider === "post" && item?.id === Number(id) && Number(item?.userId) === Number(userId),
      )
      setMyLike(isLike)
    }
  }, [userId, dataLikesMy?.data, id])

  function handle() {
    if (!loading && !!userId && !isLoading && !isLoadingLikesMy && !isPendingLikesMy && !isPending) {
      setLoading(true)
      postLike({
        id: id!,
        provider: "post",
      }).then(async (response) => {
        if (!!response?.data || typeof response?.data === "number") {
          setCount((_) => (myLike ? _ - 1 : _ + 1))
          setMyLike((_) => !_)
        } else {
          setErrorLike(true)
          on({
            message: "У нас какая-то ошибка. Мы работаем над исправлением",
          })
        }
        setLoading(false)
      })
    }
    if (!userId) {
      on({
        message: "Войдите в аккаунт, что-бы поставить лайк",
      })
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
    }
  }

  return (
    <button
      type="button"
      className="gap-1 flex flex-row items-center justify-start px-2.5 h-[1.875rem] rounded-[0.9375rem] bg-grey-field"
      onClick={handle}
    >
      <div
        className={cx(
          "w-5 h-5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
          errorLike && "[&>svg>path]:fill-text-error",
        )}
      >
        <IconLike is={myLike} />
      </div>
      <span className={cx("text-xs font-medium", myLike ? "text-text-accent" : "text-text-secondary")}>{count}</span>
    </button>
  )
}

ComponentButtonLike.displayName = "ComponentButtonLike"
export default ComponentButtonLike
