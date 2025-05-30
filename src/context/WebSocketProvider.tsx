"use client"

import { io, type ManagerOptions, type Socket, type SocketOptions } from "socket.io-client"
import { useContext, createContext, useEffect, useState, useInsertionEffect, type PropsWithChildren } from "react"

import { AuthListener } from "./AuthListener"

import { useAuth } from "@/store"
import env from "@/config/environment"
import SocketOnlineGlobal from "./SocketOnline"
import { clg } from "@console"

interface IContextSocket {
  socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
  socket: undefined,
})

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
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
      clg("ОШИБКА ПОДКЛЮЧЕНИЯ К СОКЕТУ", e, "error")
      console.log("%c--- connect_error ---", "color: #f00; font-size: 1.5rem;", e)
    }

    function error(e: any) {
      clg("ОШИБКА СОКЕТА", e, "error")
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
          clg(`подключение к сокету:`, upgradedTransport)
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
