import type { Dispatch, DispatchWithoutAction } from "react"

import { IThreadsMessages } from "@/services/threads/types"

export interface IUseMessages {
    data: {
        [key: number | string]: {
            hash: string | number
            id: number
            idUser: number
            name: string
            photo: string | undefined
            messages: IThreadsMessages[]
            created: Date | string
        }
    }
    
    setPhotoAndName: Dispatch<{
        idThread: number
        idUser: number
    }>
    setMessages: Dispatch<{ id: number; messages: IThreadsMessages[] }>
    resetMessages: DispatchWithoutAction
}
