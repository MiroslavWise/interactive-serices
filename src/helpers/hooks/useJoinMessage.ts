"use client"

import dayjs from "dayjs"
import { useId } from "react"

import { IResponseMessage } from "@/services/messages/types"
import { IImageData } from "@/store/types/useAuthState"

function useJoinMessage() {
    const idMessage = useId()

    function join(item_messages: (IResponseMessage & { temporary?: boolean })[]): IReturnMessages[] {
        const items: IReturnMessages[] = []

        if (item_messages) {
            item_messages.forEach((message, index) => {
                if (index === 0) {
                    items.push({
                        type: "time",
                        time: dayjs(message.created).format("DD.MM.YYYY"),
                    })
                }
                if (
                    index !== 0 &&
                    dayjs(message.created).format("DD.MM.YYYY") !== dayjs(items.at(-1)?.messages?.at(-1)?.time).format("DD.MM.YYYY")
                ) {
                    items.push({
                        type: "time",
                        time: dayjs(message.created).format("DD.MM.YYYY"),
                    })
                }
                if (items.at(-1)?.emitterId === message?.emitterId) {
                    items.at(-1)?.messages?.push({
                        message: message?.message || "",
                        id: `${message?.id}-${idMessage}`,
                        time: message?.created!,
                        temporary: !!message?.temporary,
                        images: message?.images!,
                    })
                } else {
                    items.push({
                        emitterId: message?.emitterId,
                        id: `${message.id}_${message?.emitterId}`,
                        type: "messages",
                        messages: [
                            {
                                message: message?.message,
                                id: `${message?.id}-${idMessage}`,
                                time: message?.created!,
                                temporary: !!message?.temporary,
                                images: message?.images!,
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
    messages?: {
        message: string
        id: string | number
        time: string | Date
        temporary?: boolean
        images: IImageData[] | string[]
    }[]
    type: "messages" | "time"
    time?: string
    emitterId?: string | number
    id?: string | number
}

export { useJoinMessage, type IReturnMessages }
