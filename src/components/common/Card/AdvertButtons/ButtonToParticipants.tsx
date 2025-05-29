import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumSign } from "@/types/enum"
import { IPosts } from "@/services/posts/types"

import Button from "../../Button"

import { useAuth } from "@/store"
import { dispatchAuthModal } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { patchFromParticipantPosts, getPostParticipants } from "@/services/posts"

interface IProps {
  post: IPosts
}

function ButtonToParticipants({ post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const { on } = useToast()

  const isParticipants = post?.isParticipants && userId !== post?.userId

  const {
    data: dataP,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getPostParticipants(post?.id!),
    queryKey: ["participants", { id: post?.id }],
    enabled: isParticipants && !!userId,
    refetchOnMount: true,
  })

  const is = !!dataP?.data && dataP?.data?.participants?.length > 0 && dataP?.data?.participants.some((_) => _.id === userId)

  async function handleBecomeMember() {
    if (isParticipants) {
      if (!loading && !isLoading) {
        if (!userId) {
          dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
          on({
            message: "Для того чтобы стать участником события, необходимо авторизоваться",
          })
          return
        }
        if (userId && userId !== post?.userId && !is) {
          setLoading(true)
          await patchFromParticipantPosts(post?.id)
          on({
            message: "Вы были добавлены в список участников данного мероприятия",
          })
          await refetch()
          setLoading(false)
          return
        }
      }
    }
  }

  return isParticipants ? (
    <Button
      label="Стать участником"
      type="button"
      typeButton="fill-primary"
      style={{ backgroundColor: "var(--card-svg-yellow) !important" }}
      className="rounded-lg px-2.5 w-min hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed *:font-normal h-9"
      onClick={(event) => {
        event.stopPropagation()
        handleBecomeMember()
      }}
      disabled={loading || isLoading || is}
    />
  ) : null
}

export default ButtonToParticipants
