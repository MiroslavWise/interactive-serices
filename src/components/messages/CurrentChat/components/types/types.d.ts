import { IUserResponse } from "@/services/users/types/usersService"
import type { FC } from "react"

interface ITextAreaSend {
    photo: string
    fullName: string
    idUser: number
    refetch(): Promise<any>
}

interface IItemMessage {
    photo: string
    messages: {
        id: number | string
        message: string
        time: Date | string
    }[]
}

interface IPopupMenu {
    dataUser?: IUserResponse | null
    isBarter: boolean
    idBarter: number
}

interface IItemTime {
    time: string
}

export type TItemTime = FC<IItemTime>
export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>
export type TPopupMenu = FC<IPopupMenu>
