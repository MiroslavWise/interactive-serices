import { useQuery } from "@tanstack/react-query"
import { type Dispatch, type SetStateAction } from "react"

import { type IPosts } from "@/services/posts/types"

import PartialLink from "./PartialLink"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getNotes } from "@/services/notes"
import { TTypeNavigatePost } from "../utils/schema"
import { useContextPostsComments } from "./ContextComments"

const NAV = ({
  countNotes,
  countComment,
}: {
  countNotes: number
  countComment: number
}): {
  label: string
  value: TTypeNavigatePost
  count: number
}[] => [
  {
    label: "Записи",
    value: "notes",
    count: countNotes,
  },
  {
    label: "Комментарии",
    value: "comments",
    count: countComment,
  },
]

interface IProps {
  post: IPosts
  state: TTypeNavigatePost
  setState: Dispatch<SetStateAction<TTypeNavigatePost>>
}

function NavigationNoteAndComments({ post, state, setState }: IProps) {
  const { data } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: post?.id! }),
    queryKey: ["notes", { order: "DESC", postId: post?.id }],
    enabled: !!post?.id,
  })
  const notes = data?.data || []
  const lengthNotes = notes.length
  const { list } = useContextPostsComments()
  const lengthComments = list.length

  return (
    <nav className="w-full flex flex-row border-b border-solid border-grey-stroke gap-[1.125rem]">
      {NAV({ countNotes: lengthNotes, countComment: lengthComments }).map((item) => (
        <a
          key={`:key:item:nav:post:${item.value}:`}
          className="flex flex-row items-start gap-1 cursor-pointer"
          onClick={() => {
            setState(item.value)
          }}
        >
          <span
            className={cx(
              "pb-1 border-b-2 border-solid text-sm font-normal",
              state === item.value ? "border-text-accent text-text-accent" : "border-transparent text-text-secondary",
            )}
          >
            {item.label}
          </span>
          <span className="text-text-disabled text-sm font-normal">{item.count}</span>
        </a>
      ))}
      <PartialLink state={state} setState={setState} postUserId={post?.userId} isParticipants={!!post?.isParticipants} id={post?.id!} />
    </nav>
  )
}

NavigationNoteAndComments.displayName = "NavigationNoteAndComments"
export default NavigationNoteAndComments
