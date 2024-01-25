import type { IBarterResponse } from "../barters/types"
import type { IReturnData, TOrder } from "../types/general"
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
    route: string
    post(value: IPostNotification): Promise<IReturnData<IResponseNotifications>>
    get(value?: IQueries): Promise<IReturnData<IResponseNotifications[]>>
    patch(value: TPatchNotification, id: number | string): Promise<IReturnData<IResponseNotifications>>
}
