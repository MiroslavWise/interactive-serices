import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn, TOrder } from "../types/general"
import { IResponseOffers, IUserOffer } from "../offers/types"
import { IResponse } from ".."

export type TStatusFeedback = "published" | "blocked" | "edited"
export type TNumberRating = 1 | 2 | 3 | 4 | 5 | number

export interface IPostTestimonials {
  receiverId: number
  targetId: number
  provider: EnumTypeProvider
  rating: TNumberRating
  barterId?: number
  message: string
  status: TStatusFeedback
  enabled: boolean
}

export type TPatchTestimonials = Partial<IPostTestimonials>

export interface IResponseTestimonials {
  id: number
  userId: number
  user: IUserOffer
  targetId: number
  offer?: IResponseOffers //id category provider title slug description categories addresses images user
  provider: EnumTypeProvider //offer
  barterId?: number
  rating: TNumberRating //1-5
  message: string
  status: TStatusFeedback
  enabled: boolean
  created: Date
  updated: Date
}

export interface IServiceTestimonials {
  get(value?: IQueries): Promise<IResponse<IResponseTestimonials[]>>
  post(value: IPostTestimonials): IPromiseReturn<IResponseTestimonials>
  patch(value: TPatchTestimonials, id: number | string): IPromiseReturn<IResponseTestimonials>
  getId(id: number | string): Promise<IResponse<IResponseTestimonials>>
}

interface IQueries {
  provider?: EnumTypeProvider
  user?: number | string
  target?: number
  order: TOrder
  status?: TStatusFeedback
  barter?: number
  offer?: number
  receiver?: number | string
}
