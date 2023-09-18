"use client"

import { usePathname } from "next/navigation"

import { usePush } from "./usePush"
import { useAuth, useChat } from "@/store/hooks"
import { useThread } from "@/store/state/useThreads"
import { useWebSocket } from "@/context/WebSocketProvider"

export const useOut = () => {
    const { reset } = useThread()
    const { signOut } = useAuth()
    const { socket } = useWebSocket()
    const { setCurrentChat } = useChat()
    const { handlePush } = usePush()

    function out() {
        handlePush(`/`)
        if (reset) reset()
        signOut()
        setCurrentChat(undefined)
        if (socket) socket?.disconnect()
    }

    return { out }
}
