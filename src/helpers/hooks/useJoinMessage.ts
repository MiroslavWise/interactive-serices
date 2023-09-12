import { useId } from "react"

import type { IThreadsMessages } from "@/services/threads/types"

function useJoinMessage() {
    const idMessage = useId()

    function join(item_messages: IThreadsMessages[]): IReturnMessages[] {
        const items: IReturnMessages[] = []

        if (item_messages) {
            item_messages.forEach((message, index) => {
                if (items.at(-1)?.emitterId === message?.emitterId) {
                    items.at(-1)?.messages?.push({
                        message: message?.message || "",
                        id: `${message?.id}-${idMessage}`,
                    })
                } else {
                    items.push({
                        emitterId: message?.emitterId,
                        id: `${message.id}_${message?.emitterId}`,
                        messages: [
                            {
                                message: message?.message,
                                id: `${message?.id}-${idMessage}`,
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
