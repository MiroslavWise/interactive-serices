"use client"

import {
    type ReactNode,
    useContext,
    createContext,
    useEffect,
    useState,
    useInsertionEffect,
} from "react"
import { shallow } from "zustand/shallow"
import {
    io,
    type ManagerOptions,
    type Socket,
    type SocketOptions,
} from "socket.io-client"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"
import { IGetProfileIdResponse } from "@/services/profile/types/profileService"

interface IContextSocket {
    socket: Socket | undefined
}

const CreateContextWebSocket = createContext<IContextSocket>({
    socket: undefined,
})

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const token = useAuth(({ token }) => token)
    const userId = useAuth(({ userId }) => userId)
    const threadId = useSearchParams().get("thread")
    const { on } = useToast()
    const { handlePush } = usePush()
    const [isFetch, setIsFetch] = useState(false)
    const [socketState, setSocketState] = useState<Socket | null>(null)

    useEffect(() => {
        if (!socketState) {
            setIsFetch(false)
        }
        const chatResponse = (event: IChatResponse) => {
            console.log("%c chatResponse event: ", "color: #d0d", event)
            if (
                Number(threadId) !== event.threadId &&
                userId !== event?.emitterId
            ) {
                on(
                    {
                        message: `${event.message}`,
                        userId: event.emitterId,
                        photo:
                            event.emitter?.profile?.image?.attributes?.url! ||
                            "",
                        name: event?.emitter?.profile?.firstName || "",
                        username: event?.emitter?.profile?.username || "",
                        id: event.id,
                    },
                    "message",
                    () => {
                        handlePush(`/messages?thread=${event.threadId}`)
                    },
                )
            }
        }
        if (socketState && userId) {
            socketState?.on(`chatResponse-${userId}`, chatResponse)

            return () => {
                socketState?.off(`chatResponse-${userId}`, chatResponse)
            }
        }
    }, [socketState, on, threadId, handlePush, userId])

    useInsertionEffect(() => {
        function connectError(e: any) {
            console.log(
                "%c--- connect_error ---",
                "color: #f00; font-size: 1.25rem;",
                e,
            )
        }

        function error(e: any) {
            console.info(
                "%c--- error socket --- ",
                "color: #f00; font-size: 1.25rem;",
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
                        `color:  #${upgradedTransport ? "0f0" : "fd3412"}`,
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
