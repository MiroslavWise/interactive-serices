"use client"

import { usePush } from "./usePush"
import { useAuth } from "@/store/hooks"
import { useThread } from "@/store/state/useThreads"
import { useWebSocket } from "@/context/WebSocketProvider"

export const useOut = () => {
    const { reset } = useThread()
    const { signOut } = useAuth()
    const { socket } = useWebSocket()
    const { handlePush } = usePush()

    function out() {
        handlePush(`/`)
        if (reset) reset()
        signOut()
        if (socket) socket?.disconnect()
    }

    return { out }
}
