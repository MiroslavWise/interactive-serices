import { type IImageData } from "@/types/type"
import { type IUserOffer as IUserSmall } from "../offers/types"
import { IPromiseReturn, type TOrder } from "../types/general"
import { IResponse } from "../request/types"

export interface INotes {
  id: number
  enabled: boolean
  description: string
  userId: number
  user: IUserSmall
  updated: string
  created: string
  images: IImageData[]
  postId: number //id поста, к которому привязана данная задача
  main: boolean //default - false, является ли эта запись главной (тогда её нельзя удалить)
}

export interface IBodyNote {
  postId: number
  description?: string
  images?: (number | null)[]
  main: boolean
  isAuthRead?: boolean
}

export interface IQueriesNotes {
  order: TOrder
  limit?: number
  user?: number
  post?: number
  main?: boolean
}

export type TPostNote = (body: IBodyNote) => Promise<IResponse<INotes>>
export type TPatchNote = (id: number, body: Partial<IBodyNote>) => IPromiseReturn<INotes>
export type TGetNotes = (query: IQueriesNotes) => Promise<IResponse<INotes[]>>
export type TDeleteNote = (id: number) => Promise<any>
