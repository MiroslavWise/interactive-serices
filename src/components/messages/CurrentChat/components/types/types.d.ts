import type { FC } from "react"

interface ITextAreaSend{
  photo: string
  fullName: string
  userIdInterlocutor: number
}

interface IItemMessage{
  photo: string
  message: string
  time: string
}

interface IPopupMenu{
  fullName: string
  photo: string
}

export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>
export type TPopupMenu = FC<IPopupMenu>