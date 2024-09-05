import { useQuery } from "@tanstack/react-query"
import { type Dispatch, type SetStateAction } from "react"

import { type IPosts } from "@/services/posts/types"

import { cx } from "@/lib/cx"
import { getNotes } from "@/services/notes"
import { useContextPostsComments } from "./ContextComments"

type TType = "notes" | "comments"

const NAV = ({
  countNotes,
  countComment,
}: {
  countNotes: number
  countComment: number
}): {
  label: string
  value: TType
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

function NavigationNoteAndComments({ post, state, setState }: { post: IPosts; state: TType; setState: Dispatch<SetStateAction<TType>> }) {
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
    </nav>
  )
}

NavigationNoteAndComments.displayName = "NavigationNoteAndComments"
export default NavigationNoteAndComments
