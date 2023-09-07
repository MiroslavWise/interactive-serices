import type { IResponseMessageProps } from "@/services/messages/types"

import { useMessages } from "@/store/state/useMessages"
import { useWebSocket } from "@/context/WebSocketProvider"

export const useSocketMessages = () => {
    const { setMessages } = useMessages()
    const { socket } = useWebSocket()

    const getSocketMessages = (id: number) => {
        socket?.emit(
            "threadMessages",
            {
                threadId: id,
            },
            (messagesData: IResponseMessageProps[]) => {
                if (Array.isArray(messagesData)) {
                    setMessages({
                        id: id,
                        messages: messagesData,
                    })
                }
            },
        )
    }

    return { getSocketMessages }
}
