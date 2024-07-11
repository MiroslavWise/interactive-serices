"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { IGetProfileIdResponse } from "@/services/profile/types"

import { useWebSocket } from "./WebSocketProvider"

import { useAuth } from "@/store"
import { useCountMessagesNotReading } from "@/helpers"
import { getBarterUserIdReceiver, serviceNotifications } from "@/services"

function Listener() {
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth(({ user }) => user) ?? {}
  const { refetchCountMessages } = useCountMessagesNotReading(false)

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
    console.log("%c barterResponse", "color: blue; font-size: 2rem;", event)
    refetchNotifications()
    refetchBarters()
  }

  useEffect(() => {
    const chatResponse = (event: IChatResponse) => {
      console.log("%c chatResponse event: ", "color: #d0d", event)
      refetchCountMessages()
    }
    if (socket && userId) {
      socket?.on(`chatResponse-${userId}`, chatResponse)
      socket?.on(`barterResponse-${userId}`, barterResponse)

      return () => {
        socket?.off(`chatResponse-${userId}`, chatResponse)
        socket?.off(`barterResponse-${userId}`, barterResponse)
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
