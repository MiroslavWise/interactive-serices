"use client"

import { useEffect, type ReactNode } from "react"

import { type IOnlineSocket } from "@/types/type"

import { dispatchOnlineUsers } from "@/store"
import { useWebSocket } from "./WebSocketProvider"

function SocketOnlineGlobal({ children }: { children: ReactNode }) {
  const { socket } = useWebSocket() ?? {}
  useEffect(() => {
    const onlineUsers = (event: IOnlineSocket) => {
      const users = event?.users || []
      if (Array.isArray(users)) {
        dispatchOnlineUsers(users)
      }
    }
    if (!!socket?.connected) {
      socket.on(`online`, onlineUsers)
      return () => {
        socket.off(`online`, onlineUsers)
      }
    }
  }, [socket])
  return children
}

export default SocketOnlineGlobal
