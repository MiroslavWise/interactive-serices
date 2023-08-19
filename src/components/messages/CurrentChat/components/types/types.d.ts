import type { FC } from "react"

interface ITextAreaSend{

}

interface IItemMessage{
  photo: string
  message: string
  time: string
}

export type TTextAreaSend = FC<ITextAreaSend>
export type TItemMessage = FC<IItemMessage>