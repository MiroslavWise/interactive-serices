import type { IBarterResponse } from "../barters/types"
import type { IPromiseReturn, TOrder } from "../types/general"
import type { TTypeStatusBarter } from "../file-upload/types"

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

export type TTypeProviderNotifications = "barter"

export interface IPostNotification {
  read: boolean
  enabled: boolean
  operation?: TTypeOperation
}

export type TPatchNotification = Partial<IPostNotification>

interface IDataBarterNotifications extends IBarterResponse {
  threadId?: number | null
}

export interface IResponseNotifications {
  id: number
  userId: number
  operation: TTypeOperation
  data: IDataBarterNotifications
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
