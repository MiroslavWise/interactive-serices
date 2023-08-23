"use client"

import { type ReactNode, useContext, createContext, useState, useEffect } from "react"

import env from "@/config/environment"


interface IContextSocket {
  chanel: WebSocket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
  chanel: undefined
})


export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [webSocketChanel, setWebSocketChanel] = useState<WebSocket | undefined>(undefined)

  useEffect(() => {
    let ws: WebSocket | undefined
    const createWebSocket = () => {
      let num: number = 5
      ws = new WebSocket(env.websocket)
      ws.onopen = () => { console.log("on open socket: ") }
      ws.onmessage = event => {
        const data = JSON.parse(event.data)
        console.log("data web socket message: ", data)
      }
      ws.onerror = (event) => {
        console.log("error socket", event)
      }
      setWebSocketChanel(ws)
    }
    createWebSocket()

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [])

  return (
    <CreateContextWebSocket.Provider value={{ chanel: webSocketChanel }}>
      {children}
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