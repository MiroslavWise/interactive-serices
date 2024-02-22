import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn } from "../types/general"

export type TStatusFeedback = "published" | "blocked" | "edited"
export type TNumberRating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number

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
  targetId: number
  provider: EnumTypeProvider
  barterId?: number
  rating: TNumberRating //1-10
  message: string
  status: TStatusFeedback
  enabled: boolean
  created: Date
  updated: Date
}

export interface IServiceTestimonials {
  get(value?: IQueries): IPromiseReturn<IResponseTestimonials[]>
  post(value: IPostTestimonials): IPromiseReturn<IResponseTestimonials>
  patch(value: TPatchTestimonials, id: number | string): IPromiseReturn<IResponseTestimonials>
  getId(id: number | string): IPromiseReturn<IResponseTestimonials>
}

interface IQueries {
  provider?: EnumTypeProvider
  user?: number | string
  target?: number
  status?: TStatusFeedback
  barter?: number
  offer?: number
  receiver?: number | string
}
