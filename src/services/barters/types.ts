import { IUserOffer } from "../offers/types"
import type { IPromiseReturn } from "@/services/types/general"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"
import { IResponseOffersCategories } from "../offers-categories/types"

export interface ISmallThread {
  id: number
  title: string
  parentId: number | null
  emitterId: number
  provider: EnumTypeProvider
}

export interface ISmallDataOfferBarter {
  id: number
  parentId?: number
  category?: IResponseOffersCategories
  provider: EnumTypeProvider.barter
  title: string
  slug: string
  description: string | null
  content: string | null
  categoryId: number
  created: Date
  updated: Date
  userId: number
  subscribers: number[]
  images: any[]
  addresses: IAddressesResponse[]
  categories: number[]
  user: IUserOffer
}

export interface IBarterResponse {
  id: number
  threadId?: number | null
  parentId: number | null
  consignedId: number // принимающий оффер
  initialId: number //инициализирующий оффер
  title: string
  imageId: number | null
  userId: number | null
  updatedById: number | null
  provider: EnumTypeProvider
  created: Date
  updated: Date
  timestamp: Date
  status: EnumStatusBarter
  initiator: ISmallDataOfferBarter
  consigner: ISmallDataOfferBarter
  reason?: string
  reasonUserId?: number
}

export interface IPostDataBarter {
  parentId?: number
  categoryId?: number
  threadId?: number
  provider: EnumTypeProvider.barter //всегда "barter"
  title: string
  imageId?: number | null
  orderBy?: number
  initialId: number
  consignedId: number
  updatedById?: number
  status: EnumStatusBarter // для отслеживания статуса бартера: инициирован, отказан, принят, завершён, не состоялся
  timestamp?: Date | string
  enabled: boolean
}

interface IQueries {
  status?: EnumStatusBarter
  user?: number | string
  order?: "ASC" | "DESC"
  [key: string]: any
}

export type IPatchDataBarter = Partial<IPostDataBarter> & {
  reason?: string
}

export enum ETypeReason {
  "found-specialist" = "found-specialist",
  "found-through-friend" = "found-through-friend",
  "circumstances" = "circumstances",
  "specialists" = "specialists",
  "company-service" = "company-service",
  "spam" = "spam",
  "other" = "other",
}

export interface IBartersService {
  get(values?: IQueries): IPromiseReturn<IBarterResponse[]>
  getId(id: string | number): IPromiseReturn<IBarterResponse>
  getUserId(id: string | number, values?: IQueries): IPromiseReturn<IBarterResponse[]>
  getReceiverId(id: string | number, values?: IQueries): IPromiseReturn<IBarterResponse[]>
  post(value: IPostDataBarter): IPromiseReturn<IBarterResponse>
  patch(value: IPatchDataBarter, id: number | string): IPromiseReturn<IBarterResponse>
}
