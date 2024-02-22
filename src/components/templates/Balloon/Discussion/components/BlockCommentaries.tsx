"use client"

import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useRef, useState } from "react"

import type { ICommentsResponse, IPostDataComment } from "@/services/comments/types"

import { ButtonLike } from "./ButtonLike"
import { BlockAvatars } from "./BlockAvatars"
import { ItemComment } from "./ItemComment"
import { ButtonNeedHelp } from "./ButtonNeedHelp"
import { NextImageMotion } from "@/components/common"

import { useAuth, useBalloonDiscussion } from "@/store"
import { serviceComments, serviceProfile, serviceOffersThreads } from "@/services"

import styles from "../styles/block-commentaries.module.scss"

export const BlockCommentaries = ({ isAlert }: { isAlert?: boolean }) => {
  const userId = useAuth(({ userId }) => userId)
  const offer = useBalloonDiscussion(({ offer }) => offer)
  const { id } = offer ?? {}
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const refList = useRef<HTMLDivElement>(null)
  const [currentComments, setCurrentComments] = useState<ICommentsResponse[]>([])

  const { register, watch, setValue, handleSubmit } = useForm<IValues>({})

  const { data: dataMyProfile } = useQuery({
    queryFn: () => serviceProfile.getUserId(userId!),
    queryKey: ["profile", userId!],
    enabled: !!userId,
  })

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
      flushSync(() => {
        if (refList.current) {
          const top = refList.current.scrollHeight
          refList.current.scroll({ top: top + 100, behavior: "smooth" })
        }
      })
    }
  }, [currentComments, expand])

  function submit(values: IValues) {
    if (!loading) {
      setLoading(true)
      if (!!values?.text?.trim()) {
        const data: IPostDataComment = {
          offerThreadId: currentOffersThreads?.id,
          message: values?.text?.trim(),
          status: "published",
          enabled: true,
        }

        setCurrentComments((prev) => [
          ...prev,
          {
            ...data,
            id: Math.random(),
            parentId: null,
            userId: userId!,
            status: "create",
            created: new Date(),
          },
        ])

        serviceComments.post(data).then((response) => {
          console.log("---response comment---", response?.res)
          flushSync(() => {
            refetchComments()
            setValue("text", "")
            setLoading(false)
          })
        })
      } else {
        setLoading(false)
      }
    }
  }

  const onSubmit = handleSubmit(submit)

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
          {isAlert ? <ButtonNeedHelp /> : <ButtonLike />}
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
            <form onSubmit={onSubmit}>
              <div data-img-avatar>
                <NextImageMotion src={dataMyProfile?.res?.image?.attributes?.url!} alt="avatar" width={40} height={40} />
              </div>
              <input
                {...register("text", { required: true, minLength: 3, maxLength: 240 })}
                type="text"
                placeholder="Ваш комментарий..."
                autoComplete="off"
                maxLength={240}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.code === "Enter") {
                    onSubmit()
                  }
                }}
              />
              <button type="submit" disabled={!watch("text")?.trim() || loading}>
                <img src="/svg/sent.svg" alt="sent" width={20} height={20} />
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

interface IValues {
  text: string
}
