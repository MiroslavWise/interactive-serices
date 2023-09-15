import type { FC } from "react"

interface ITextAreaSend {
    photo: string
    fullName: string
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
    fullName: string
    photo: string
}

interface IItemTime {
    time: string
}

export type TItemTime = FC<IItemTime>
export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>
export type TPopupMenu = FC<IPopupMenu>
