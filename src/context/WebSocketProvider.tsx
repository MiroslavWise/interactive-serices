"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useEffect,
    useRef,
} from "react"
import {
    io,
    type ManagerOptions,
    type Socket,
    type SocketOptions,
} from "socket.io-client"

import { useAuth } from "@/store/hooks"
import env from "@/config/environment"

interface IContextSocket {
    socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
    socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()
    const socketRef = useRef<Socket | null>(null)
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (token) {
            if (fetchedRef.current) return
            fetchedRef.current = true
            const options: Partial<ManagerOptions & SocketOptions> = {
                auth: {
                    accessToken: token,
                },
                withCredentials: true,
                autoConnect: false,
                reconnection: false,
                path: "/ws/socket.io",
                transports: ["polling", "websocket"],
            }
            const socket: Socket = io(env.websocket, options)
            console.log("--- socket: ---", socket)
            socket.on("connect", () => {
                const upgradedTransport = socket.io.engine.transport.name
                console.log(
                    "--- upgradedTransport socket --- ",
                    upgradedTransport,
                )
                socketRef.current = socket
            })
            socket.on("connect_error", (e) => {
                console.log("--- connect_error ---", e)
            })

            socket.on("error", (e) => {
                console.info("--- error socket --- ", e)
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
