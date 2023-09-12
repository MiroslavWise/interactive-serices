import type { IResponseMessageProps } from "@/services/messages/types"

import { useMessages } from "@/store/state/useMessages"
// import { useWebSocket } from "@/context/WebSocketProvider"
import { threadsService } from "@/services/threads"

export const useSocketMessages = () => {
    const { setMessages } = useMessages()
    // const { socket } = useWebSocket()

    const getSocketMessages = (id: number) => {
        threadsService.get(id).then((response) => {
            console.log("messages response : ", response)
            setMessages({
                id: response?.res?.id!,
                messages: response?.res?.messages!,
            })
        })
        // socket?.emit(
        //     "threadMessages",
        //     {
        //         threadId: id,
        //     },
        //     (messagesData: IResponseMessageProps[]) => {
        //         if (Array.isArray(messagesData)) {
        //             setMessages({
        //                 id: id,
        //                 messages: messagesData,
        //             })
        //         }
        //     },
        // )
    }

    return { getSocketMessages }
}
