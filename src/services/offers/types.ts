import type { IPromiseReturn, TOrder } from "../types/general"
import type { IImageData } from "@/store/types/useAuthState"
import type { IGetProfileIdResponse } from "../profile/types"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"
import { EnumTypeProvider } from "@/types/enum"

export interface IResponseCreate {
  id: number
}

export interface IPostOffers {
  parentId?: number
  categoryId?: number
  addresses?: number[]
  subscribers?: number[]
  provider: EnumTypeProvider
  title: string
  slug: string
  description?: string
  content?: string
  imageId?: number | null
  featuredId?: number | null
  bannerId?: number | null
  orderBy?: number
  createdById?: number
  updatedById?: number
  enabled: boolean
  desired: boolean
  images?: number[]
}

export type IPatchOffers = Partial<IPostOffers> & { categories?: number[] }

export interface IResponseOffers {
  id: number
  parentId?: number
  categoryId?: number
  provider: EnumTypeProvider
  title: string
  slug: string
  description?: string
  content?: string
  imageId?: number | null
  featuredId?: number
  bannerId?: number | null
  userId?: number
  categories: number[]
  addresses: IAddressesResponse[]
  images: IImageData[]
  updated: Date | string
  created: Date | string
}

export interface IQueriesOffers {
  category?: string
  order?: TOrder
  user?: number
  provider?: EnumTypeProvider
}

export interface IServiceOffers {
  post(value: IPostOffers): IPromiseReturn<IResponseCreate>
  get(value?: IQueriesOffers): IPromiseReturn<IResponseOffers[]>
  patch(value: IPatchOffers, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): IPromiseReturn<IResponseOffers>
  delete(id: number | string): IPromiseReturn<IResponseCreate>
  getUserId(id: number | string, value?: IQueriesOffers): IPromiseReturn<IResponseOffers[]>
}
