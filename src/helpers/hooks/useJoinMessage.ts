import { IResponseMessageProps } from "@/services/messages/types"

function useJoinMessage() {
    function join(item_messages: IResponseMessageProps[]): IReturnMessages[] {
        const items: IReturnMessages[] = []

        if (item_messages) {
            item_messages.forEach((message, index) => {
                if (items.at(-1)?.emitterId === message?.emitterId) {
                    items.at(-1)?.messages?.push({
                        message: message?.message || "",
                        id: Number(message?.id),
                    })
                } else {
                    items.push({
                        emitterId: message?.emitterId,
                        id: `${message.id}_${message?.emitterId}`,
                        messages: [
                            {
                                message: message?.message,
                                id: Number(message?.id),
                            },
                        ],
                    })
                }
            })
        }

        return items
    }

    return { join }
}

interface IReturnMessages {
    messages: {
        message: string
        id: string | number
    }[]
    emitterId: string | number
    id: string | number
}

export { useJoinMessage, type IReturnMessages }
