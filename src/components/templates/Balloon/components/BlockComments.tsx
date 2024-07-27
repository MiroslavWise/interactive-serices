"use client"

import { useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ICommentsResponse } from "@/services/comments/types"

import { ListCommentaries } from "./ListCommentaries"
import { FormAppendComment } from "./FormAppendComment"

import { useAuth } from "@/store"
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
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

  const { data: dataComments, refetch: refetchComments } = useQuery({
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
        if (event.user_id !== userId) {
          refetchComments()
        }
      }

      if (userId && socket) {
        socket?.on(`commentResponse-${threadId}`, commentResponse)
      }

      return () => {
        socket?.off(`commentResponse-${threadId}`, commentResponse)
      }
    }
  }, [socket, threadId, userId])

  return (
    <div className="w-full flex flex-col gap-0 !px-0" data-text="container-commentaries">
      <ListCommentaries
        currentComments={currentComments}
        expand={expandComment}
        setExpand={setExpandComment}
        currentOffersThreadId={threadId!}
      />
      <FormAppendComment idOffersThread={threadId!} setCurrentComments={setCurrentComments} />
    </div>
  )
}

BlockComments.displayName = "BlockComments"
export default BlockComments
