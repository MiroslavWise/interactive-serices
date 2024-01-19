import { IBarterResponse } from "../barters/types"
import { TTypeStatusBarter } from "../file-upload/types"
import type { IReturnData, TOrder } from "../types/general"

export type TTypeOperation = "create" | "completion-survey" | "completion-yes" | "completion-no" | "completion-recall"
export type TTypeProviderNotifications = "barter"

export interface IPostNotification {
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
    email: boolean
    sms: boolean
    provider: TTypeProviderNotifications
    push: boolean
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
