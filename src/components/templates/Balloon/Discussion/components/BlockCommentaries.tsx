"use client"

import { useQuery } from "@tanstack/react-query"
import { DispatchWithoutAction, memo, useEffect, useMemo, useRef, useState } from "react"

import type { ICommentsResponse } from "@/services/comments/types"

import { BlockAvatars } from "./BlockAvatars"
import { ItemComment } from "./ItemComment"
import { ButtonNeedHelp } from "./ButtonNeedHelp"

import { useAuth } from "@/store"
import { serviceComments, serviceOffersThreads } from "@/services"

import styles from "../styles/block-commentaries.module.scss"
import { FormAppendComment } from "./FormAppendComment"

export const BlockCommentaries = memo(
  ({ isAlert, close, id, idUser }: { isAlert?: boolean; close: DispatchWithoutAction; id: number; idUser: number }) => {
    const userId = useAuth(({ userId }) => userId)

    const [expand, setExpand] = useState(false)
    const refList = useRef<HTMLDivElement>(null)
    const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

    const { data: dataOffersThreads } = useQuery({
      queryFn: () =>
        serviceOffersThreads.get({
          offer: id!,
        }),
      queryKey: ["offers-threads", id!],
      enabled: !!id!,
      refetchOnMount: true,
      refetchOnReconnect: true,
    })

    const currentOffersThreads = useMemo(() => {
      return dataOffersThreads?.res?.find((item) => item?.offerId === id) || null
    }, [dataOffersThreads?.res, id])

    const { data: dataComments, refetch: refetchComments } = useQuery({
      queryFn: () => serviceComments.get({ offer: currentOffersThreads?.id! }),
      queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
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
      if (expand && currentComments?.length > 0) {
        requestAnimationFrame(() => {
          if (refList.current) {
            const top = refList.current.scrollHeight
            refList.current.scroll({ top: top + 100, behavior: "smooth" })
          }
        })
      }
    }, [currentComments, expand])

    return (
      <div className={styles.container}>
        <div data-header>
          <div data-divider="horizontal" />
          <BlockAvatars idsUser={Array.from(new Set(currentComments.map((item) => item.userId!)))} />
          <div data-buttons>
            <button
              onClick={(event) => {
                event.stopPropagation()
                setExpand((prev) => !prev)
              }}
              data-comments
            >
              <span>{currentComments?.length} комментариев</span>
              <div data-img data-is-expand={expand}>
                <img src="/svg/chevron-down.svg" alt="down" width={18} height={18} />
              </div>
            </button>
            {isAlert ? <ButtonNeedHelp idUser={idUser} close={close} /> : null}
          </div>
        </div>
        {expand ? (
          <div data-commentaries>
            <div data-list ref={refList}>
              {currentComments.map((item) => (
                <ItemComment key={`::key::comment::item::${item.id}::`} {...item} />
              ))}
            </div>
            {!!userId ? (
              <FormAppendComment
                idOffersThread={currentOffersThreads?.id!}
                refetchComments={refetchComments}
                setCurrentComments={setCurrentComments}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)
