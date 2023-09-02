"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useState,
    useEffect,
} from "react"

import env from "@/config/environment"
import { useAuth } from "@/store/hooks"

interface IContextSocket {
    chanel: WebSocket | undefined
    create(): void
}

const CreateContextWebSocket = createContext<IContextSocket>({
    chanel: undefined,
    create() {},
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [webSocketChanel, setWebSocketChanel] = useState<
        WebSocket | undefined
    >(undefined)
    const { token } = useAuth()

    function create() {
        let ws: WebSocket | undefined
        const createWebSocket = () => {
            ws = new WebSocket(env?.websocket)
            if (ws) {
                ws.onopen = () => {
                    console.log("on open socket: ")
                }
                ws.onmessage = (event) => {
                    const data = JSON.parse(event?.data)
                    console.log("data web socket message: ", data)
                }
                ws.onerror = (event) => {
                    console.log("error socket", event)
                }
                ws.onclose = (event) => {
                    console.log("onclose socket", event)
                }
            }
            setWebSocketChanel(ws)
        }
        createWebSocket()
    }

    useEffect(() => {
        create()
    }, [])

    useEffect(() => {
        let heartbeatInterval: any
        if (token && webSocketChanel) {
            setTimeout(sendHeartbeat, 3 * 1000)
            heartbeatInterval = setInterval(() => {
                try {
                    sendHeartbeat()
                } catch (e) {
                    clearInterval(heartbeatInterval)
                    console.warn("warn heartbeat message", e)
                    if (webSocketChanel) {
                        webSocketChanel.close()
                    }
                }
            }, 30 * 1000)
        } else {
            clearInterval(heartbeatInterval)
            heartbeatInterval = null
        }

        function sendHeartbeat() {
            if (webSocketChanel && webSocketChanel.readyState === 1) {
                webSocketChanel?.send(
                    JSON.stringify({
                        event: "heartbeat",
                        data: {
                            heartbeat_msg: "--heartbeat--",
                        },
                    }),
                )
            }
        }

        return () => {
            clearInterval(heartbeatInterval)
            heartbeatInterval = null
        }
    }, [token, webSocketChanel])

    return (
        <CreateContextWebSocket.Provider
            value={{ chanel: webSocketChanel, create: create }}
        >
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
