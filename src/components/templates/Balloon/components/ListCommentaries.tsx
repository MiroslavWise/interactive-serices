import { useQuery } from "@tanstack/react-query"
import { Dispatch, memo, SetStateAction, useEffect, useMemo, useRef } from "react"

import { ICommentsResponse } from "@/services/comments/types"

import { ItemComment } from "./ItemComment"

import { serviceComments } from "@/services"
import { LoadingProfile } from "@/components/common"

export const ListCommentaries = memo(({ expand, currentComments = [], setExpand, currentOffersThreadId }: IProps) => {
  const refList = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery({
    queryFn: () => serviceComments.get({ offer: currentOffersThreadId!, limit: 2 }),
    queryKey: ["comments", { offerId: currentOffersThreadId, limit: 2 }],
    enabled: !!currentOffersThreadId,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (expand && currentComments.length > 0) {
      requestAnimationFrame(() => {
        if (refList.current) {
          const top = refList.current.scrollHeight
          refList.current.scroll({ top: top + 100, behavior: "smooth" })
        }
      })
    }
  }, [currentComments, expand])

  const firstComment = useMemo(() => {
    if (!data?.res || data?.res?.length === 0) return null

    return data?.res[0]
  }, [data?.res])

  const length = data?.meta?.total || 0

  return (
    <div data-list ref={refList} data-test="balloon-list-commentaries">
      {!expand && firstComment ? (
        <ItemComment key={`::key::comment::item::${firstComment.id}::first::`} {...firstComment} />
      ) : isLoading ? (
        <LoadingProfile />
      ) : null}
      {!expand && length > 1 ? (
        <button
          type="button"
          data-button-expand
          onClick={(event) => {
            event.stopPropagation()
            setExpand(true)
          }}
        >
          <span>Показать все комментарии</span>
        </button>
      ) : null}
      {expand ? currentComments.map((item) => <ItemComment key={`::key::comment::item::${item.id}::`} {...item} />) : null}
    </div>
  )
})

interface IProps {
  currentOffersThreadId: number
  currentComments: ICommentsResponse[]
  expand: boolean
  setExpand: Dispatch<SetStateAction<boolean>>
}
