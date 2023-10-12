"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useEffect,
    useRef,
    useState,
    useInsertionEffect,
    useLayoutEffect,
} from "react"
import {
    io,
    type ManagerOptions,
    type Socket,
    type SocketOptions,
} from "socket.io-client"
import { toast } from "react-toastify"
import { useTheme } from "next-themes"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import env from "@/config/environment"

interface IContextSocket {
    socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
    socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { token, userId } = useAuth()
    const fetchedRef = useRef(false)
    const { systemTheme } = useTheme()
    const { handlePush } = usePush()
    const [socketState, setSocketState] = useState<Socket | null>(null)

    function connectError(e: any) {
        console.log("--- connect_error ---", e)
    }

    function error(e: any) {
        console.info("--- error socket --- ", e)
    }

    useLayoutEffect(() => {
        function chatResponse(data: any) {
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
                        handlePush(`/messages?thread=${data?.threadId}`)
                    },
                    theme: systemTheme,
                })
            }
        }
        function checkOnline(data: any) {
            console.log("response effect: ", data)
        }
        
        if (!fetchedRef.current) {
            if (token) {
                const options: Partial<ManagerOptions & SocketOptions> = {
                    auth: {
                        accessToken: token,
                    },
                    withCredentials: true,
                    path: "/ws/socket.io",
                    transports: ["websocket"],
                    secure: true,
                }
                
                const socket: Socket = io(env.websocket, options)

                socket.on("connect", () => {
                    console.log("--- new connection socket ---", socket)
                    const upgradedTransport = socket.io.engine.transport.name
                    console.log(
                        "--- connect upgradedTransport ---",
                        upgradedTransport,
                    )
                    fetchedRef.current = true
                    setSocketState(socket)
                })
                socket.on("connect_error", connectError)
                socket.on("error", error)
                socket.connect()
                socket.on("chatResponse", chatResponse)
                socket.on("online", checkOnline)
                return () => {
                    socket.disconnect()
                    socket.off("connect")
                    socket.off("disconnect")
                    socket.off("connect_error")
                    socket.off("error")
                    socket.off("chat")
                    socket.off("heartbeat")
                    socket.off("chatResponse")
                    socket.off("online")
                }
            }

            if (!token) {
                setSocketState(null)
                fetchedRef.current = false
            }
        }
    }, [token, handlePush, systemTheme, userId])

    return (
        <CreateContextWebSocket.Provider value={{ socket: socketState! }}>
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
