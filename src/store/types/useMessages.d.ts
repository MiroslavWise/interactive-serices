import type { Dispatch, DispatchWithoutAction } from "react"

import type { IResponseMessageProps } from "@/services/messages/types"

export interface IUseMessages {
    data: {
        [key: number | string]: {
            id: number
            userId: number
            name: string
            photo: string | undefined
            messages: IResponseMessageProps[]
        }
    }

    setPhotoAndName: Dispatch<{
        id: number
        userId: number
        photo: string | undefined
        name: string
    }>
    setMessages: Dispatch<{ id: number; messages: IResponseMessageProps[] }>
    resetMessages: DispatchWithoutAction
}
