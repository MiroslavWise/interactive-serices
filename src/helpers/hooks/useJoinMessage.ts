"use client"

import { useId } from "react"

import { dayFormat } from "../functions/daysAgo"
import { IUserOffer } from "@/services/offers/types"
import type { IImageData } from "@/store/types/useAuthState"
import type { IResponseMessage } from "@/services/messages/types"

function useJoinMessage() {
  const idMessage = useId()

  function join(item_messages: (IResponseMessage & { temporary?: boolean })[]): IReturnMessages[] {
    const items: IReturnMessages[] = []

    if (item_messages) {
      item_messages.forEach((message, index) => {
        if (index === 0) {
          items.push({
            type: "time",
            time: dayFormat(message.created, "dd.MM.yyyy")!,
          })
        }
        if (index !== 0 && dayFormat(message.created, "dd.MM.yyyy") !== dayFormat(items.at(-1)?.messages?.at(-1)?.time, "dd.MM.yyyy")) {
          items.push({
            type: "time",
            time: dayFormat(message.created, "dd.MM.yyyy")!,
          })
        }
        if (items.at(-1)?.emitter?.id === message?.emitterId) {
          items.at(-1)?.messages?.push({
            message: message?.message || "",
            id: `${message?.id}-${idMessage}`,
            time: message?.created!,
            temporary: !!message?.temporary,
            images: message?.images!,
            reading: false,
            readIds: message?.readIds || [],
          })
        } else {
          items.push({
            emitter: message?.emitter!,
            id: `${message.id}_${message?.emitterId}`,
            type: "messages",
            messages: [
              {
                message: message?.message,
                id: `${message?.id}-${idMessage}`,
                time: message?.created!,
                temporary: !!message?.temporary,
                images: message?.images!,
                reading: false,
                readIds: message?.readIds || [],
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
    reading: boolean
    readIds: number[]
  }[]
  type: "messages" | "time"
  time?: string
  emitter?: IUserOffer
  id?: string | number
}

export { useJoinMessage, type IReturnMessages }
