"use client"

import { useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { type IResponseOffers } from "@/services/offers/types"
import { type ICommentsResponse } from "@/services/comments/types"

import ListCommentaries from "./ListCommentaries"
import FormAppendComment from "./FormAppendComment"

import { useWebSocket } from "@/context"
import { getComments } from "@/services"

interface IProps {
  offer: IResponseOffers
  expandComment: boolean

  setExpandComment: Dispatch<SetStateAction<boolean>>
}

function BlockComments({ offer, expandComment, setExpandComment }: IProps) {
  const { socket } = useWebSocket() ?? {}
  const { threadId } = offer ?? {}
  const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

  const {
    data: dataComments,
    refetch: refetchComments,
    isLoading,
  } = useQuery({
    queryFn: () => getComments({ offer: threadId! }),
    queryKey: ["comments", { offerThreads: threadId! }],
    enabled: !!threadId!,
    refetchOnMount: true,
  })
  useEffect(() => {
    if (dataComments?.data && dataComments?.data?.length > 0) {
      if (Array.isArray(dataComments?.data)) {
        setCurrentComments(dataComments?.data)
      }
    }
  }, [dataComments?.data])

  useEffect(() => {
    if (socket && threadId) {
      const commentResponse = (event: any) => {
        console.log("commentResponse: ", event)
        refetchComments()
      }

      if (socket) {
        socket?.on(`commentResponse-${threadId}`, commentResponse)
      }

      return () => {
        socket?.off(`commentResponse-${threadId}`, commentResponse)
      }
    }
  }, [socket, threadId])

  const total = dataComments?.meta?.total || 0

  return (
    <div className="w-full flex flex-col gap-0 !px-0" data-text="container-commentaries">
      <ListCommentaries
        currentComments={currentComments}
        expand={expandComment}
        setExpand={setExpandComment}
        currentOffersThreadId={threadId!}
        isLoading={isLoading}
        total={total}
      />
      <FormAppendComment idOffersThread={threadId!} setCurrentComments={setCurrentComments} />
    </div>
  )
}

BlockComments.displayName = "BlockComments"
export default BlockComments
