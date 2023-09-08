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
import { toast } from "react-toastify"
import { useTheme } from "next-themes"

import { useAuth } from "@/store/hooks"
import env from "@/config/environment"
import { usePush } from "@/helpers/hooks/usePush"

interface IContextSocket {
    socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
    socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { token, userId } = useAuth()
    const socketRef = useRef<Socket | null>(null)
    const fetchedRef = useRef(false)
    const { systemTheme } = useTheme()
    const { handlePush } = usePush()

    useEffect(() => {
        if (token) {
            if (fetchedRef.current) return
            fetchedRef.current = true
            const options: Partial<ManagerOptions & SocketOptions> = {
                auth: {
                    accessToken: token,
                },
                withCredentials: true,
                autoConnect: true,
                reconnection: true,
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

            socket.on("chatResponse", (data) => {
                console.log("chatResponse effect: ", data)
                if (Number(userId) !== Number(data?.emitterId)) {
                    toast(data?.message + " " + data?.emitterId, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClick() {
                            handlePush(
                                `/messages?user=${data?.emitterId}&thread=${data?.threadId}`,
                            )
                        },
                        theme: systemTheme,
                    })
                }
            })

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
