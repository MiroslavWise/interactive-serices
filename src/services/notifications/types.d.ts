import type { IReturnData, TOrder } from "../types/general"

export type TTypeOperation = "create"

export interface IPostNotification {}

export type TPatchNotification = Partial<IPostNotification>

export interface IResponseNotifications {
    id: number
    userId: number
    operation: TTypeOperation
    data: any
    created: Date
    updated: Date
    email: boolean
    sms: boolean
    push: boolean
}

interface IQueries {
    order?: TOrder
}

export interface IServiceNotifications {
    route: string
    post(value: IPostNotification): Promise<IReturnData<IResponseNotifications>>
    get(value?: IQueries): Promise<IReturnData<IResponseNotifications[]>>
    patch(
        value: TPatchNotification,
        id: number | string,
    ): Promise<IReturnData<IResponseNotifications>>
}
