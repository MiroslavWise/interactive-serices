import { type Dispatch, type SetStateAction, useEffect, useMemo, useRef } from "react"

import { type ICommentsResponse } from "@/services/comments/types"

import { ItemComment } from "./ItemComment"
import { LoadingProfile } from "@/components/common"

interface IProps {
  expand: boolean
  currentOffersThreadId: number
  isLoading: boolean
  total: number
  currentComments: ICommentsResponse[]
  setExpand: Dispatch<SetStateAction<boolean>>
}

function ListCommentaries({ expand, currentComments = [], isLoading, setExpand, total }: IProps) {
  const refList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expand && currentComments.length > 0) {
      setTimeout(() => {
        if (refList.current) {
          const top = refList.current.scrollHeight
          refList.current.scroll({ top: top + 100, behavior: "smooth" })
        }
      })
    }
  }, [currentComments.length, expand])

  const firstComment = useMemo(() => {
    if (!currentComments || currentComments?.length === 0) return null

    return currentComments[0]
  }, [currentComments])

  return (
    <div
      className="overflow-x-hidden overflow-y-visible h-fit w-full flex flex-col gap-2.5 pb-2.5 [&>div]:px-5"
      ref={refList}
      data-test="balloon-list-commentaries"
    >
      {!expand && firstComment ? (
        <ItemComment key={`::key::comment::item::${firstComment.id}::first::`} {...firstComment} />
      ) : isLoading ? (
        <LoadingProfile />
      ) : null}
      {!expand && total > 1 ? (
        <button
          type="button"
          className="w-full flex flex-row items-center bg-transparent border-none outline-none px-5"
          onClick={(event) => {
            event.stopPropagation()
            setExpand(true)
          }}
        >
          <span className="text-text-accent text-left text-sm font-medium">Показать все комментарии</span>
        </button>
      ) : null}
      {expand ? currentComments.map((item) => <ItemComment key={`::key::comment::item::${item.id}::`} {...item} />) : null}
    </div>
  )
}

ListCommentaries.displayName = "ListCommentaries"
export default ListCommentaries
