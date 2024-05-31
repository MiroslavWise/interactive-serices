"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { EnumStatusBarter } from "@/types/enum"
import { IGetProfileIdResponse } from "@/services/profile/types"

import { useWebSocket } from "./WebSocketProvider"
import { useToast } from "@/helpers/hooks/useToast"

import { useAuth } from "@/store"
import { useCountMessagesNotReading } from "@/helpers"
import { getBarterUserIdReceiver, serviceNotifications } from "@/services"

function Listener() {
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth(({ user }) => user) ?? {}
  const { onMessage } = useToast()
  const { refetchCountMessages } = useCountMessagesNotReading()
  const threadId = useSearchParams().get("thread")

  const { refetch: refetchNotifications } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: false,
  })

  const { refetch: refetchBarters } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: false,
  })

  function barterResponse(event: IBarterResponse) {
    console.log("%c barterResponse", "color: blue; font-size: 1.5rem;", event)
    refetchNotifications()
    refetchBarters()
  }

  function threadResponse(event: IThreadResponse) {
    console.log("%c threadResponse", "color: green; font-size: 1rem;", event)
    refetchNotifications()
    refetchCountMessages()
  }

  useEffect(() => {
    const onlineUsers = (event: any) => {
      console.log("onlineUsers: ", event)
    }

    const chatResponse = (event: IChatResponse) => {
      console.log("%c chatResponse event: ", "color: #d0d", event)
      if (Number(threadId) !== event.threadId && userId !== event?.emitterId) {
        onMessage({
          id: event.id,
          threadId: event.threadId,
          name: `${event.emitter?.profile?.firstName || ""} ${event.emitter?.profile?.lastName || ""}`,
          message: `${event.message}`,
          photo: event.emitter?.profile?.image?.attributes?.url! || "",
        })
        refetchCountMessages()
      }
    }
    if (socket && userId) {
      socket?.on(`chatResponse-${userId}`, chatResponse)
      socket?.on(`barterResponse-${userId}`, barterResponse)
      socket?.on(`threadResponse-${userId}`, threadResponse)
      socket?.on(`online`, onlineUsers)

      return () => {
        socket?.off(`chatResponse-${userId}`, chatResponse)
        socket?.off(`barterResponse-${userId}`, barterResponse)
        socket?.off(`threadResponse-${userId}`, threadResponse)
        socket?.off(`online`, onlineUsers)
      }
    }
  }, [socket, userId])

  return null
}

export function AuthListener() {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  return isAuth ? <Listener /> : null
}

interface IThreadResponse {}

interface IChatResponse {
  created: Date
  emitterId: number
  id: number
  images: any[]
  message: string
  parentId: number
  receiverIds: number[]
  threadId: number
  updated: Date
  emitter: {
    profile: IGetProfileIdResponse
  }
}

interface IBarterResponse {
  barterId: number
  created: Date
  message: string
  receiverIds: number[]
  emitterId: number
  status: EnumStatusBarter | "accepted"
  threadId: number
}
