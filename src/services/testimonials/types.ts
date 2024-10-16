import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { type IResponse } from "../request/types"
import { type IPromiseReturn, type TOrder } from "../types/general"
import { type IResponseOffers, type IUserOffer } from "../offers/types"

type TStatusFeedback = "published" | "blocked" | "edited"
type TNumberRating = 1 | 2 | 3 | 4 | 5 | number

export interface IBodyPostTestimonials {
  receiverId: number
  targetId: number
  provider: EnumTypeProvider
  rating: TNumberRating
  barterId?: number
  message: string
  status: TStatusFeedback
  enabled: boolean
  images?: number[]
}

type TPatchTestimonials = Partial<IBodyPostTestimonials>

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
  images: IImageData[]
}

export interface IServiceTestimonials {
  get(value?: IQueries): Promise<IResponse<IResponseTestimonials[]>>
  post(value: IBodyPostTestimonials): IPromiseReturn<IResponseTestimonials>
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
