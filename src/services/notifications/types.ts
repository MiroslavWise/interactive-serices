import { type IUserOffer } from "../offers/types"
import { type IBarterResponse } from "../barters/types"
import { type IPromiseReturn, type TOrder } from "../types/general"

type TTypeOperation =
  | "create"
  | "completion-survey"
  | "completion-yes"
  | "completion-no"
  | "completion-recall"
  | "accepted"
  | "completion-recall-no"
  | "feedback-received"
  | "feedback-received-no"
  | "canceled"

type TTypeProviderNotifications = "barter" | "offer-pay" | "comment"

interface IPostNotification {
  read: boolean
  enabled: boolean
  operation?: TTypeOperation
}

type TPatchNotification = Partial<IPostNotification>

export interface DataNotification extends IBarterResponse {
  message?: string
  post_id?: number
}
export interface IResponseNotifications {
  id: number
  userId: number
  operation: TTypeOperation
  data: DataNotification
  created: string
  updated: string
  provider: TTypeProviderNotifications
  read: boolean
  sent: boolean
  user: IUserOffer
}

interface IQueries {
  order?: TOrder
}

export interface IServiceNotifications {
  post(value: IPostNotification): IPromiseReturn<IResponseNotifications>
  get(value?: IQueries): IPromiseReturn<IResponseNotifications[]>
  patch(value: TPatchNotification, id: number | string): IPromiseReturn<IResponseNotifications>
}
