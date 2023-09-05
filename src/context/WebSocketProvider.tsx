"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useState,
    useEffect,
    useRef,
} from "react"
import { io, Socket } from "socket.io-client"

import env from "@/config/environment"
import { useAuth } from "@/store/hooks"

interface IContextSocket {
    socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
    socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()
    const socketRef = useRef<Socket | null>(null)

    console.log("socketRef: ", socketRef)

    useEffect(() => {
        if (token) {
            const options = {
                auth: {
                    accessToken: token,
                },
                autoConnect: true,
                reconnection: true,
            }
            const socket: Socket = io(env.websocket, options)
            socket.on("connect", () => {
                const upgradedTransport = socket.io.engine.transport.name
                console.log(
                    "--- upgradedTransport socket --- ",
                    upgradedTransport,
                )
            })
            socketRef.current = socket

            socket.on("error", (e) => {
                console.error("--- error socket --- ", e)
            })

            socket.connect()

            return () => {
                socket.disconnect()
                socket.off("connect")
                socket.off("disconnect")
                socket.off("chat")
                socket.off("heartbeat")
            }
        }

        if (!token) {
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current = null
            }
        }
    }, [token])

    return (
        <CreateContextWebSocket.Provider value={{ socket: socketRef.current! }}>
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
