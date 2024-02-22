import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn } from "../types/general"

export interface IPostOffersThreads {
  parentId?: number
  offerId: number
  enabled: boolean
}

export type IPatchOffersThreads = Partial<IPostOffersThreads>

export interface IResponseOffersThreads {
  id: number
  parentId?: number | null
  offerId: number
  enabled: boolean
  created: Date
  updated: Date
}

export interface IServiceOffersThreads {
  post(value: IPostOffersThreads): IPromiseReturn<IResponseOffersThreads>
  get(value?: IQueries): IPromiseReturn<IResponseOffersThreads[]>
  patch(value: IPatchOffersThreads, id: number | string): IPromiseReturn<IResponseOffersThreads>
  getId(id: number | string): IPromiseReturn<IResponseOffersThreads>
  delete(id: number | string): IPromiseReturn<IResponseOffersThreads>
}

interface IQueries {
  user?: number
  target?: number
  status?: string
  provider?: EnumTypeProvider
  offer?: number
}
