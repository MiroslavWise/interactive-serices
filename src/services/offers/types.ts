import { type IImageData } from "@/types/type"
import { type ICompany } from "../types/company"
import { type IResponse } from "../request/types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { IPaginateQuery, type IPromiseReturn, type TOrder } from "../types/general"
import { type IResponseOffersCategories } from "../offers-categories/types"
import { type IAddressesResponse } from "../addresses/types/serviceAddresses"
import { type TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"

export interface IResponseCreate {
  id: number
}
export interface IPostOffers {
  parentId?: number
  categoryId?: number
  addresses?: number[]
  subscribers?: number[]
  provider: EnumTypeProvider
  title?: string
  slug: string
  description: string
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
  urgent?: EnumHelper | ""
}

export type IPatchOffers = Partial<IPostOffers> & { categories?: number[] }

export interface IUserOffer {
  about: string | null
  birthdate?: Date | string | null
  firstName: string
  email?: string
  gender: TGenderForm | null
  id: number
  lastName: string
  username: string
  image?: IImageData
}

export interface IResponseOffers {
  id: number
  parentId?: number
  categoryId?: number
  category: IResponseOffersCategories
  provider: EnumTypeProvider
  title: string
  slug: string
  description?: string
  content?: string
  imageId?: number | null
  featuredId?: number
  bannerId?: number | null
  userId: number
  categories: number[]
  addresses: IAddressesResponse[]
  images: IImageData[]
  user: IUserOffer
  updated: Date | string
  created: Date | string
  threadId: number | null
  urgent: EnumHelper | null
  company?: ICompany
}

export interface IQueriesOffers extends IPaginateQuery {
  category?: string
  search?: string
  user?: number
  provider?: EnumTypeProvider
  urgent?: EnumHelper
}

export interface IServiceOffers {
  post(value: IPostOffers & { userId?: number }): Promise<IResponse<IResponseCreate>>
  get(value?: IQueriesOffers): Promise<IResponse<IResponseOffers[]>>
  patch(value: IPatchOffers, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): Promise<IResponse<IResponseOffers>>
  delete(id: number | string): IPromiseReturn<IResponseCreate>
  getUserId(id: number | string, value?: IQueriesOffers, isInvalid?: boolean): Promise<IResponse<IResponseOffers[]>>
}

interface IStringUrl {
  url: string
  options?: RequestInit
}

export type TGetStringOffers = (value?: IQueriesOffers) => IStringUrl
export type TGetStringOffersUserId = (id: number, value?: IQueriesOffers) => IStringUrl
