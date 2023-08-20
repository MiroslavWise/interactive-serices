import type { FC } from "react"

interface ITextAreaSend{
  photo: string
  fullName: string
}

interface IItemMessage{
  photo: string
  message: string
  time: string
}

export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>