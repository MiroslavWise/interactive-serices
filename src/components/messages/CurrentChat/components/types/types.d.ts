import type { Dispatch, FC, SetStateAction } from "react"

import type { IImageData } from "@/store/types/useAuthState"
import type { IResponseMessage } from "@/services/messages/types"
import type { IUserResponse } from "@/services/users/types"

interface ITextAreaSend {
    idUser: number
    setStateMessages: Dispatch<SetStateAction<(IResponseMessage & { temporary?: boolean })[]>>
    refetch(): Promise<any>
}

interface IItemMessage {
    photo: string
    messages: {
        id: number | string
        message: string
        time: Date | string
        temporary?: boolean
        images: IImageData[] | string[]
        reading: boolean
        readIds: number[]
    }[]
}

interface IPopupMenu {
    dataUser?: IUserResponse | null
}

interface IItemTime {
    time: string
}

interface IFilesUpload {
    files: File[]
    strings: string[]
    addFile: Dispatch<File>
    addString: Dispatch<string>
    deleteFile: Dispatch<number>
}

export type TFilesUpload = FC<IFilesUpload>
export type TItemTime = FC<IItemTime>
export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>
export type TPopupMenu = FC<IPopupMenu>
