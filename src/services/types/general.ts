import type { UUID } from "crypto"

export interface IPaginateQuery {
  limit?: number
  page?: number
  order?: TOrder
}

export interface IMetaData {
  page: number
  limit: number
  total: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  time: string
  requestId: UUID
}

export interface IReturnData<T> {
  ok: boolean
  error?: any | null
  res?: T | null
  meta?: IMetaData | null
}

export type IPromiseReturn<P> = Promise<IReturnData<P>>

export type TProviderOffer =
  | "main"
  | "beauty"
  | "pets"
  | "studying"
  | "transport"
  | "housework"
  | "appliances"
  | "social"
  | "children"
  | "games"
  | "rent"

export enum EOrder {
  DESC = "DESC",
  ASC = "ASC",
}
export type TOrder = "DESC" | "ASC"
