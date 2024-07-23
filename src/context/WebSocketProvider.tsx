"use client"

import { io, type ManagerOptions, type Socket, type SocketOptions } from "socket.io-client"
import { type ReactNode, useContext, createContext, useEffect, useState, useInsertionEffect } from "react"

import { EnumStatusBarter } from "@/types/enum"
import type { IGetProfileIdResponse } from "@/services/profile/types"

import { AuthListener } from "./AuthListener"

import { useAuth } from "@/store"
import env from "@/config/environment"
import SocketOnlineGlobal from "./SocketOnline"

interface IContextSocket {
  socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
  socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth(({ auth }) => auth) ?? {}
  const { id: userId } = useAuth(({ user }) => user) ?? {}
  const [isFetch, setIsFetch] = useState(false)
  const [socketState, setSocketState] = useState<Socket | null>(null)

  useEffect(() => {
    if (!socketState) {
      setIsFetch(false)
    }
  }, [socketState])

  useInsertionEffect(() => {
    function connectError(e: any) {
      console.log("%c--- connect_error ---", "color: #f00; font-size: 1.5rem;", e)
    }

    function error(e: any) {
      console.info("%c--- error socket --- ", "color: #f00; font-size: 1.5rem;", e)
    }
    if (!isFetch) {
      if (accessToken) {
        const options: Partial<ManagerOptions & SocketOptions> = {
          auth: {
            accessToken: accessToken,
          },
          withCredentials: true,
          path: "/ws/socket.io",
          transports: ["websocket"],
          secure: true,
        }

        const socket: Socket = io(env.websocket, options)

        socket.on("connect", () => {
          const upgradedTransport = socket.io.engine.transport.name
          console.log("%c--- connect upgradedTransport ---", `color:  #${upgradedTransport ? "0f0" : "fd3412"}`, upgradedTransport)
          setSocketState(socket)
        })
        socket.on("connect_error", connectError)
        socket.on("error", error)
        socket.connect()
      }

      if (!accessToken) {
        setSocketState(null)
        setIsFetch(false)
      }
    }
  }, [accessToken, userId, isFetch])

  return (
    <CreateContextWebSocket.Provider value={{ socket: socketState! }}>
      <SocketOnlineGlobal>{children}</SocketOnlineGlobal>
      <AuthListener />
    </CreateContextWebSocket.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(CreateContextWebSocket)

  if (context === undefined) {
    throw new Error("Not WebSocket Context")
  }

  return context
}

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
