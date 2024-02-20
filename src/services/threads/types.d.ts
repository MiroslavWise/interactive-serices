import type { IImageData } from "@/store/types/useAuthState"
import type { IPromiseReturn } from "../types/general"

export type TTypeProviderThreads = "personal" | "barter" | "groups" | "offer-pay"

export interface IPostThreads {
  title: "completed" | string
  parentId?: number
  receiverIds: number[]
  offerId?: number
  provider: string
  barterId?: number
  enabled?: boolean
}

export type IPatchThreads = Partial<IPostThreads>

export interface IThreadsMessages {
  id: number
  created: Date
  message: string
  emitterId: number
  receiverIds: number[]
  readIds: number[]
  images: IImageData[]
}

export interface IResponseThreads {
  id: number //id thread
  title: string
  parentId: number
  emitterId: number
  offerId?: number
  receiverIds: number[]
  provider: string
  barterId?: number
  messages: IThreadsMessages[]
  created: Date
  updated: Date
}

export interface IResponseCreate {
  id: number
}

export interface IResponseThread {
  id: number
  title: string
  parentId?: number
  emitterId: number
  receiverIds: number[]
  enabled: boolean
  provider: TTypeProviderThreads
  barterId?: number
  offerId?: number
  created: Date | string
  updated: Date | string
  messages: IThreadsMessages[]
}

interface IQueryParams {
  user?: number | string
  provider?: TTypeProviderThreads
  order?: "ASC" | "DESC"
  messagesLimit?: number
  messagesOrder?: "ASC" | "DESC"
}

export interface IServiceThreads {
  post(value: IPostThreads): IPromiseReturn<IResponseCreate>
  get(value?: IQueryParams): IPromiseReturn<IResponseThreads[]>
  patch(value: IPatchThreads, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): IPromiseReturn<IResponseThread>
  delete(id: number | string): IPromiseReturn<IResponseCreate>
  getUserId(userId: number | string): IPromiseReturn<IResponseThreads[]>
}
