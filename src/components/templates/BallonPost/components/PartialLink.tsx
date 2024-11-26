import { useQuery } from "@tanstack/react-query"
import { type Dispatch, type SetStateAction } from "react"

import { type TTypeNavigatePost } from "../utils/schema"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getPostParticipants } from "@/services/posts"

interface IProps {
  state: TTypeNavigatePost
  setState: Dispatch<SetStateAction<TTypeNavigatePost>>
  postUserId: number
  isParticipants: boolean
  id: number
}

function PartialLink({ state, setState, postUserId, isParticipants, id }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data } = useQuery({
    queryFn: () => getPostParticipants(id),
    queryKey: ["participants", { id: id }],
    enabled: isParticipants && !!id && userId === postUserId && !!userId,
  })

  const count = (data?.data?.participants ?? []).length

  if (!!userId && postUserId === userId && isParticipants)
    return (
      <a
        key={`:k:i:n:p:participants:`}
        className="flex flex-row items-start gap-1 cursor-pointer"
        onClick={() => {
          setState("participants")
        }}
      >
        <span
          className={cx(
            "pb-1 border-b-2 border-solid text-sm font-normal",
            state === "participants" ? "border-text-accent text-text-accent" : "border-transparent text-text-secondary",
          )}
        >
          Участники
        </span>
        <span className={cx("text-text-disabled text-sm font-normal", !count && "hidden")}>{count}</span>
      </a>
    )

  return null
}

PartialLink.displayName = "PartialLink"
export default PartialLink
