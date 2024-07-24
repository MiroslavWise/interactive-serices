import { useQuery } from "@tanstack/react-query"
import { Dispatch, memo, SetStateAction, useEffect, useMemo, useRef } from "react"

import { ICommentsResponse } from "@/services/comments/types"

import { ItemComment } from "./ItemComment"

import { serviceComments } from "@/services"
import { LoadingProfile } from "@/components/common"

export function ListCommentaries({ expand, currentComments = [], setExpand, currentOffersThreadId }: IProps) {
  const refList = useRef<HTMLDivElement>(null)

  const { data: dataComments, isLoading } = useQuery({
    queryFn: () => serviceComments.get({ offer: currentOffersThreadId }),
    queryKey: ["comments", { offerThreads: currentOffersThreadId }],
    enabled: !!currentOffersThreadId,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (expand && currentComments.length > 0) {
      setTimeout(() => {
        if (refList.current) {
          const top = refList.current.scrollHeight
          refList.current.scroll({ top: top + 100, behavior: "smooth" })
        }
      })
    }
  }, [currentComments, expand])

  const firstComment = useMemo(() => {
    if (!dataComments?.data || dataComments?.data?.length === 0) return null

    return dataComments?.data[0]
  }, [dataComments?.data])

  const length = dataComments?.meta?.total || 0

  return (
    <div
      className="overflow-x-hidden overflow-y-visible h-fit w-full flex flex-col gap-0.625 pb-0.625 [&>div]:px-5"
      ref={refList}
      data-test="balloon-list-commentaries"
    >
      {!expand && firstComment ? (
        <ItemComment key={`::key::comment::item::${firstComment.id}::first::`} {...firstComment} />
      ) : isLoading ? (
        <LoadingProfile />
      ) : null}
      {!expand && length > 1 ? (
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

interface IProps {
  currentOffersThreadId: number
  currentComments: ICommentsResponse[]
  expand: boolean
  setExpand: Dispatch<SetStateAction<boolean>>
}
