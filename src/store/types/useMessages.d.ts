import type { Dispatch, DispatchWithoutAction } from "react"

import { IThreadsMessages } from "@/services/threads/types"

export interface IUseMessages {
    data: {
        [key: number | string]: {
            hash: string | number
            id: number
            userId: number
            name: string
            photo: string | undefined
            messages: IThreadsMessages[]
        }
    }

    setPhotoAndName: Dispatch<{
        id: number
        userId: number
        photo: string | undefined
        name: string
    }>
    setMessages: Dispatch<{ id: number; messages: IThreadsMessages[] }>
    resetMessages: DispatchWithoutAction
}
