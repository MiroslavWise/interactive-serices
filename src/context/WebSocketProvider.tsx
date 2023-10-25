"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useEffect,
    useRef,
    useState,
    useInsertionEffect,
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
    const { token, userId } = useAuth()
    const [isFetch, setIsFetch] = useState(false)
    const [socketState, setSocketState] = useState<Socket | null>(null)

    useEffect(() => {
        if (!socketState) {
            setIsFetch(false)
        }
    }, [socketState])

    useInsertionEffect(() => {
        function connectError(e: any) {
            console.log(
                "%c--- connect_error ---",
                "color: #f00; font-size: 20px;",
                e,
            )
        }

        function error(e: any) {
            console.info(
                "%c--- error socket --- ",
                "color: #f00; font-size: 20px;",
                e,
            )
        }
        if (!isFetch) {
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
                    const upgradedTransport = socket.io.engine.transport.name
                    console.log(
                        "%c--- connect upgradedTransport ---",
                        "color: #fd3412",
                        upgradedTransport,
                    )
                    setSocketState(socket)
                })
                socket.on("connect_error", connectError)
                socket.on("error", error)
                socket.connect()
            }

            if (!token) {
                setSocketState(null)
                setIsFetch(false)
            }
        }
    }, [token, userId, isFetch])

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
