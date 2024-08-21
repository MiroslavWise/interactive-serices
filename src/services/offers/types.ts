import { type IPromiseReturn, type TOrder } from "../types/general"
import { type IImageData } from "@/types/type"
import { type IAddressesResponse } from "../addresses/types/serviceAddresses"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"
import { type IResponseOffersCategories } from "../offers-categories/types"
import { type IResponse } from "../request"

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
  urgent?: EnumHelper
}

export type IPatchOffers = Partial<IPostOffers> & { categories?: number[] }

export interface IUserOffer {
  about: string | null
  birthdate: Date | string | null
  firstName: string
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
}

export interface IQueriesOffers {
  category?: string
  order?: TOrder
  user?: number
  provider?: EnumTypeProvider
  limit?: number
  page?: number
  urgent?: EnumHelper
}

export interface IServiceOffers {
  post(value: IPostOffers): Promise<IResponse<IResponseCreate>>
  get(value?: IQueriesOffers): Promise<IResponse<IResponseOffers[]>>
  patch(value: IPatchOffers, id: number | string): IPromiseReturn<IResponseCreate>
  getId(id: number | string): Promise<IResponse<IResponseOffers>>
  delete(id: number | string): IPromiseReturn<IResponseCreate>
  getUserId(id: number | string, value?: IQueriesOffers): Promise<IResponse<IResponseOffers[]>>
}
