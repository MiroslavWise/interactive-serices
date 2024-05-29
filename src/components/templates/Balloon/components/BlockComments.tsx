"use client"

import { useQuery } from "@tanstack/react-query"
import { Dispatch, memo, SetStateAction, useEffect, useMemo, useState } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ICommentsResponse } from "@/services/comments/types"

import { ListCommentaries } from "./ListCommentaries"
import { FormAppendComment } from "./FormAppendComment"

import { useAuth_ } from "@/store"
import { useWebSocket } from "@/context"
import { serviceComments, serviceOffersThreads } from "@/services"

import styles from "../styles/block-comments.module.scss"

export function BlockComments({ offer, expandComment, setExpandComment }: IProps) {
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

  const { data: dataOffersThreads } = useQuery({
    queryFn: () =>
      serviceOffersThreads.get({
        offer: offer.id!,
      }),
    queryKey: ["offers-threads", { id: offer.id }],
    enabled: !!offer.id,
  })

  const currentOffersThreads = useMemo(() => {
    return dataOffersThreads?.res?.find((item) => item?.offerId === offer.id) || null
  }, [dataOffersThreads?.res, offer.id])

  const { data: dataComments, refetch: refetchComments } = useQuery({
    queryFn: () => serviceComments.get({ offer: currentOffersThreads?.id! }),
    queryKey: ["comments", { offerThreads: currentOffersThreads?.id }],
    enabled: !!currentOffersThreads?.id!,
  })
  useEffect(() => {
    if (dataComments?.res && dataComments?.res?.length > 0) {
      if (Array.isArray(dataComments?.res)) {
        setCurrentComments(dataComments?.res)
      }
    }
  }, [dataComments?.res])

  useEffect(() => {
    if (socket && currentOffersThreads) {
      const commentResponse = (event: any) => {
        console.log("commentResponse: ", event)
        if (event.user_id !== userId) {
          refetchComments()
        }
      }

      if (userId && socket) {
        socket?.on(`commentResponse-${currentOffersThreads.id}`, commentResponse)
      }

      return () => {
        socket?.off(`commentResponse-${currentOffersThreads.id}`, commentResponse)
      }
    }
  }, [socket, currentOffersThreads, userId])

  return (
    <div className={styles.container} data-text="container-commentaries">
      <ListCommentaries
        currentComments={currentComments}
        expand={expandComment}
        setExpand={setExpandComment}
        currentOffersThreadId={currentOffersThreads?.id!}
      />
      {!!userId ? (
        <FormAppendComment
          idOffersThread={currentOffersThreads?.id!}
          refetchComments={refetchComments}
          setCurrentComments={setCurrentComments}
        />
      ) : null}
    </div>
  )
}

interface IProps {
  offer: IResponseOffers
  expandComment: boolean

  setExpandComment: Dispatch<SetStateAction<boolean>>
}
