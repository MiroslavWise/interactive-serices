import type { IBarterResponse } from "../barters/types"
import type { IPromiseReturn, TOrder } from "../types/general"

export type TTypeOperation =
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

export type TTypeProviderNotifications = "barter" | "offer-pay"

export interface IPostNotification {
  read: boolean
  enabled: boolean
  operation?: TTypeOperation
}

export type TPatchNotification = Partial<IPostNotification>

export interface IResponseNotifications {
  id: number
  userId: number
  operation: TTypeOperation
  data: IBarterResponse
  created: string
  updated: string
  provider: TTypeProviderNotifications
  read: boolean
  sent: boolean
}

interface IQueries {
  order?: TOrder
}

export interface IServiceNotifications {
  post(value: IPostNotification): IPromiseReturn<IResponseNotifications>
  get(value?: IQueries): IPromiseReturn<IResponseNotifications[]>
  patch(value: TPatchNotification, id: number | string): IPromiseReturn<IResponseNotifications>
}
