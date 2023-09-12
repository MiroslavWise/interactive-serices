import { useMessages } from "@/store/state/useMessages"
import { threadsService } from "@/services/threads"

export const useSocketMessages = () => {
    const { setMessages } = useMessages()

    const getSocketMessages = (id: number) => {
        threadsService.get(id).then((response) => {
            setMessages({
                id: response?.res?.id!,
                messages: response?.res?.messages!,
            })
        })
    }

    return { getSocketMessages }
}
