import { useMessages } from "@/store/state/useMessages"
import { serviceThreads } from "@/services/threads"
import { IThreadsMessages } from "@/services/threads/types"

export const useSocketMessages = () => {
    const { setMessages } = useMessages()

    const getSocketMessages = (id: number) => {
        serviceThreads.getId(id).then((response) => {
            setMessages({
                id: response?.res?.id!,
                messages: response?.res?.messages!,
            })
        })
    }

    const getMessages = (id: number, messages: IThreadsMessages[]) => {
        if (Array.isArray(messages)) {
            setMessages({
                id: id!,
                messages: messages!,
            })
        }
    }

    return { getSocketMessages, getMessages }
}
