import { IImageData } from "@/store/types/useAuthState"
import type { IPromiseReturn } from "../types/general"

export interface IRequestPostMessages {
  threadId: number
  message: string
  parentId?: number | undefined | null
  emitterId: number
  receiverIds: number[]
  enabled?: boolean
  created: Date | string
}

export interface IResponseCreate {
  id: number
}

export type IRequestPatchMessages = Partial<IRequestPostMessages>

export interface IResponseMessageProps {
  id: number
  message: string
  parentId: number | null
  threadId: number
  emitterId: number
  receiverIds: number[]
  images: IImageData[] | string[]
  readIds: number[]
}

export interface IResponseMessage extends IResponseMessageProps {
  enabled?: boolean
  created?: Date | string
  updated?: Date | string
}

export interface IMessages {
  post(value: IRequestPostMessages): IPromiseReturn<IResponseCreate>
  postRead(id: number): IPromiseReturn<IResponseCreate>
  get(value: Record<string, any>): IPromiseReturn<IResponseMessage[]>
  patch(value: IRequestPatchMessages, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): IPromiseReturn<IResponseMessage>
  getUserId(id: number | string): IPromiseReturn<IResponseMessage[]>
}
