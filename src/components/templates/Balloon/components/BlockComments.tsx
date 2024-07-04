"use client"

import { useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ICommentsResponse } from "@/services/comments/types"

import { ListCommentaries } from "./ListCommentaries"
import { FormAppendComment } from "./FormAppendComment"

import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { serviceComments } from "@/services"

export function BlockComments({ offer, expandComment, setExpandComment }: IProps) {
  const { socket } = useWebSocket() ?? {}
  const { threadId } = offer ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

  const { data: dataComments, refetch: refetchComments } = useQuery({
    queryFn: () => serviceComments.get({ offer: threadId! }),
    queryKey: ["comments", { offerThreads: threadId! }],
    enabled: !!threadId!,
  })
  useEffect(() => {
    if (dataComments?.res && dataComments?.res?.length > 0) {
      if (Array.isArray(dataComments?.res)) {
        setCurrentComments(dataComments?.res)
      }
    }
  }, [dataComments?.res])

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
      {!!userId ? (
        <FormAppendComment idOffersThread={threadId!} refetchComments={refetchComments} setCurrentComments={setCurrentComments} />
      ) : null}
    </div>
  )
}

interface IProps {
  offer: IResponseOffers
  expandComment: boolean

  setExpandComment: Dispatch<SetStateAction<boolean>>
}
