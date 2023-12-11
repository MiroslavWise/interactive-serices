import type { Dispatch, FC, SetStateAction } from "react"

import type { IImageData } from "@/store/types/useAuthState"
import type { IResponseMessage } from "@/services/messages/types"
import type { IUserResponse } from "@/services/users/types/usersService"

interface ITextAreaSend {
    photo: string
    fullName: string
    idUser: number
    isBarter: boolean
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
    }[]
}

interface IPopupMenu {
    dataUser?: IUserResponse | null
    isBarter: boolean
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
