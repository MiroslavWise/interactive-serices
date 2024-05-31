"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import type { IResponseMessage } from "@/services/messages/types"

import { PopupMenu } from "../components/PopupMenu"
import TextAreaSend from "../components/TextAreaSend"
import { ListMessages } from "../components/ListMessages"
import { NextImageMotion, LoadingInput } from "@/components/common"

import { useWebSocket } from "@/context"
import { getMessages, getThreadId, postReadMessage } from "@/services"
import { useCountMessagesNotReading, usePush, useResize } from "@/helpers"
import { useAuth, usePopupMenuChat, useUserIdMessage, dispatchDataUser } from "@/store"

import styles from "../styles/style.module.scss"

export const CurrentChat = () => {
  const { isTablet } = useResize()
  const idThread = useSearchParams().get("thread")
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const setIsVisible = usePopupMenuChat(({ setIsVisible }) => setIsVisible)
  const { handleReplace } = usePush()
  const { socket } = useWebSocket() ?? {}
  const [stateMessages, setStateMessages] = useState<(IResponseMessage & { temporary?: boolean })[]>([])
  const { refetchCountMessages } = useCountMessagesNotReading()

  const { data } = useQuery({
    queryFn: () => getThreadId(idThread!),
    queryKey: ["threads", { userId: userId, threadId: idThread }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  })

  const {
    data: dataMessages,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getMessages({ thread: idThread }),
    queryKey: ["messages", { userId: userId, threadId: idThread }],
    refetchOnMount: true,
  })

  useEffect(() => {
    if (data?.res?.enabled === false && data?.ok) {
      handleReplace("/messages")
    }
  }, [data, handleReplace])

  useEffect(() => {
    if (userId && data?.res) {
      const replaceOut = () => {
        return Number(data?.res?.emitter?.id!) === Number(userId) || !!data?.res?.receivers?.some((_) => _.id === userId!)
      }
      if (!replaceOut()) {
        handleReplace("/messages")
      }
    }
  }, [userId, data?.res, handleReplace])

  const user = useMemo(() => {
    if (data?.res) {
      return Number(data?.res?.emitter?.id) === Number(userId) ? data?.res?.receivers[0] : data?.res?.emitter
    }

    return null
  }, [data?.res, userId])

  const userDataIdMassage = useUserIdMessage(({ userData }) => userData)

  useEffect(() => {
    if (!!user) {
      dispatchDataUser(user)
    }
  }, [user])

  useEffect(() => {
    if (dataMessages?.res && Array.isArray(dataMessages?.res)) {
      setStateMessages(dataMessages?.res!)
    }
  }, [dataMessages?.res])

  useEffect(
    () => () => {
      if (isTablet) {
        setIsVisible(false)
      }
    },
    [setIsVisible],
  )

  const conversationPartner = useMemo(() => {
    return {
      photo: user?.image?.attributes?.url! || userDataIdMassage?.image?.attributes?.url!,
      name: `${user?.firstName || userDataIdMassage?.firstName || " "} ${user?.lastName || userDataIdMassage?.lastName || " "}`,
      messages: stateMessages,
    }
  }, [user, userDataIdMassage, stateMessages])

  useEffect(() => {
    function chatResponse(event: any) {
      if (event?.threadId === Number(idThread)) {
        if (event?.receiverIds?.includes(userId!)) {
          postReadMessage(event?.id!).then(({ ok }) => {
            if (ok) {
              refetch()
            }
          })
        } else {
          refetch()
        }
      }
    }

    socket?.on(`chatResponse-${userId}`, chatResponse)

    return () => {
      socket?.off(`chatResponse-${userId}`, chatResponse)
    }
  }, [socket, refetch, idThread, userId])

  useEffect(() => {
    if (dataMessages?.res && userId && Array.isArray(dataMessages?.res)) {
      const notMyMessages = dataMessages?.res?.filter((item) => item.receiverIds.includes(userId))
      const notReading = notMyMessages?.filter((item) => !item?.readIds?.includes(userId))?.map((item) => item?.id)

      Promise.all(notReading.map((item) => postReadMessage(item))).then((responses) => {
        requestAnimationFrame(() => {
          refetchCountMessages()
        })
      })
    }
  }, [userId, dataMessages?.res])

  if (isTablet)
    return (
      <div className={styles.wrapper}>
        <header>
          <Link data-back href={{ pathname: "/messages" }}>
            <img src="/svg/chevron-left.svg" alt="chevron-left" width={24} height={24} />
          </Link>
          <article>
            <NextImageMotion src={conversationPartner?.photo!} alt="avatar" width={28} height={28} className={styles.avatar} />
            <h5>{conversationPartner?.name!}</h5>
          </article>
          <button onClick={() => setIsVisible()}>
            <img src="/svg/dots-vertical.svg" alt="dots-vertical" width={24} height={24} />
          </button>
        </header>
        <section>
          <ListMessages messages={stateMessages} thread={data?.res!} user={user! || userDataIdMassage!} isLoading={isLoading} />
        </section>
        {isLoading ? <LoadingInput /> : <TextAreaSend setStateMessages={setStateMessages} idUser={Number(user?.id)} refetch={refetch} />}
        <PopupMenu dataUser={user} />
      </div>
    )

  return (
    <div className={styles.wrapper}>
      <ListMessages thread={data?.res!} messages={stateMessages} user={user! || userDataIdMassage!} isLoading={isLoading} />
      {isLoading ? <LoadingInput /> : <TextAreaSend setStateMessages={setStateMessages} idUser={Number(user?.id)} refetch={refetch} />}
    </div>
  )
}
