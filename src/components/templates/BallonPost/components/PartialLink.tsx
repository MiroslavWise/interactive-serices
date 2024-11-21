import { type Dispatch, type SetStateAction } from "react"

import { type TTypeNavigatePost } from "../utils/schema"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"

interface IProps {
  state: TTypeNavigatePost
  setState: Dispatch<SetStateAction<TTypeNavigatePost>>
  postUserId: number
  isParticipants: boolean
}

function PartialLink({ state, setState, postUserId, isParticipants }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

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
      </a>
    )

  return null
}

PartialLink.displayName = "PartialLink"
export default PartialLink
