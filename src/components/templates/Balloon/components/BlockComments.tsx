"use client"

import { useQuery } from "@tanstack/react-query"
import { DispatchWithoutAction, memo, useEffect, useMemo, useRef, useState } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ICommentsResponse } from "@/services/comments/types"

import { ListCommentaries } from "./ListCommentaries"
import { FormAppendComment } from "./FormAppendComment"

import { useAuth } from "@/store"
import { serviceComments, serviceOffersThreads } from "@/services"

import styles from "../styles/block-comments.module.scss"

export const BlockComments = memo(({ close, offer }: IProps) => {
  const userId = useAuth(({ userId }) => userId)
  const [expand, setExpand] = useState(false)
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
    queryKey: ["comments", { offerId: currentOffersThreads?.id }],
    enabled: !!currentOffersThreads?.id!,
  })
  useEffect(() => {
    if (dataComments?.res && dataComments?.res?.length > 0) {
      if (Array.isArray(dataComments?.res)) {
        setCurrentComments(dataComments?.res)
      }
    }
  }, [dataComments?.res])

  return (
    <div className={styles.container}>
      <ListCommentaries currentComments={currentComments} expand={expand} setExpand={setExpand} currentOffersThreadId={currentOffersThreads?.id!} />
      {!!userId ? (
        <FormAppendComment
          idOffersThread={currentOffersThreads?.id!}
          refetchComments={refetchComments}
          setCurrentComments={setCurrentComments}
        />
      ) : null}
    </div>
  )
})

interface IProps {
  close: DispatchWithoutAction
  offer: IResponseOffers
}
