"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { io, type ManagerOptions, type Socket, type SocketOptions } from "socket.io-client"
import { type ReactNode, useContext, createContext, useEffect, useState, useInsertionEffect } from "react"

import type { TTypeStatusBarter } from "@/services/file-upload/types"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"

import { useAuth } from "@/store"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"
import { queryClient } from "./QueryClientProviderContext"
import { useCountMessagesNotReading, usePush } from "@/helpers"
import { serviceProfile, serviceBarters, serviceNotifications } from "@/services"

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
    const { on, onMessage, onBarters } = useToast()
    const { handlePush } = usePush()
    const [isFetch, setIsFetch] = useState(false)
    const [socketState, setSocketState] = useState<Socket | null>(null)
    const { refetchCountMessages } = useCountMessagesNotReading()

    const { refetch: refetchNotifications } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", { userId: userId }],
        enabled: false,
    })

    const { refetch: refetchBarters } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", { receiver: userId, status: "initiated" }],
        enabled: false,
    })

    useEffect(() => {
        if (!socketState) {
            setIsFetch(false)
        }
        const chatResponse = (event: IChatResponse) => {
            console.log("%c chatResponse event: ", "color: #d0d", event)
            if (Number(threadId) !== event.threadId && userId !== event?.emitterId) {
                onMessage({
                    id: event.id,
                    threadId: event.threadId,
                    name: `${event.emitter?.profile?.firstName || ""} ${event.emitter?.profile?.lastName || ""}`,
                    message: `${event.message}`,
                    photo: event.emitter?.profile?.image?.attributes?.url! || "",
                })
                refetchCountMessages()
            }
        }

        function barterResponse(event: IBarterResponse) {
            console.log("%c barterResponse event: ", "color: #d0d", event)

            queryClient
                .fetchQuery({
                    queryFn: () => serviceProfile.getUserId(event?.emitterId),
                    queryKey: ["profile", event?.emitterId],
                })
                .then((response) => {
                    if (response?.ok) {
                        const { firstName, lastName } = response?.res ?? {}
                        if (event.status === "initiated") {
                            onBarters({
                                title: "Предложение на обмен",
                                message: ``,
                                status: event.status,
                                threadIdBarter: `${event?.barterId}-${event?.receiverIds[0]}`,
                            })
                        }

                        if (event.status === "accepted") {
                            onBarters({
                                title: "Обмен был принят",
                                message: `Пользователь ${firstName || ""} ${lastName || ""} принял ваш запрос на обмен`,
                                status: event?.status,
                                threadId: event?.threadId,
                            })
                        }

                        if (event.status === "completed") {
                            onBarters({
                                title: "Обмен завершён",
                                message: ``,
                                status: event?.status,
                                threadId: event?.threadId,
                            })
                        }
                    }
                    refetchNotifications()
                    refetchBarters()
                })
        }

        if (socketState && userId) {
            socketState?.on(`chatResponse-${userId}`, chatResponse)
            socketState?.on(`barterResponse-${userId}`, barterResponse)

            return () => {
                socketState?.off(`chatResponse-${userId}`, chatResponse)
                socketState?.off(`barterResponse-${userId}`, barterResponse)
            }
        }
    }, [socketState, on, threadId, handlePush, userId])

    useInsertionEffect(() => {
        function connectError(e: any) {
            console.log("%c--- connect_error ---", "color: #f00; font-size: 1.5rem;", e)
        }

        function error(e: any) {
            console.info("%c--- error socket --- ", "color: #f00; font-size: 1.5rem;", e)
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
                    console.log("%c--- connect upgradedTransport ---", `color:  #${upgradedTransport ? "0f0" : "fd3412"}`, upgradedTransport)
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

    return <CreateContextWebSocket.Provider value={{ socket: socketState! }}>{children}</CreateContextWebSocket.Provider>
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
    status: TTypeStatusBarter | "accepted"
    threadId: number
}
