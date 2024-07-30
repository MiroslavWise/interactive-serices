import { type IImageData } from "@/types/type"
import type { IPromiseReturn } from "../types/general"
import { EnumProviderThreads } from "@/types/enum"
import type { IUserOffer } from "../offers/types"
import { IResponse } from "../request"

export interface IPostThreads {
  title: "completed" | string
  parentId?: number
  receiverIds: number[]
  offerId?: number
  provider: string
  barterId?: number
  enabled?: boolean
}

type IPatchThreads = Partial<IPostThreads>

interface IThreadsMessages {
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
  parentId: number | null
  emitter: IUserOffer
  offerId?: number
  receivers: IUserOffer[]
  provider: EnumProviderThreads
  barterId?: number
  messages: IThreadsMessages[]
  created: Date
  updated: Date
}

interface IResponseCreate {
  id: number
}

export interface IResponseThread {
  id: number
  title: string
  parentId?: number
  emitter: IUserOffer
  receivers: IUserOffer[]
  enabled: boolean
  provider: EnumProviderThreads
  barterId?: number
  offerId?: number
  created: Date | string
  updated: Date | string
  messages: IThreadsMessages[]
}

interface IQueryParams {
  user?: number | string
  provider?: EnumProviderThreads
  order?: "ASC" | "DESC"
  messagesLimit?: number
  messagesOrder?: "ASC" | "DESC"
}

export interface IServiceThreads {
  post(value: IPostThreads): IPromiseReturn<IResponseCreate>
  get(value?: IQueryParams): Promise<IResponse<IResponseThreads[]>>
  patch(value: IPatchThreads, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): Promise<IResponse<IResponseThread>>
  delete(id: number | string): IPromiseReturn<IResponseCreate>
  getUserId(userId: number | string): Promise<IResponse<IResponseThreads[]>>
}
