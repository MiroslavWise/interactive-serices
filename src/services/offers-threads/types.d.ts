import { TTypeProvider } from "../file-upload/types"
import { IReturnData } from "../types/general"

export interface IPostOffersThreads {
    parentId?: number
    offerId: number
    enabled: boolean
}

export type IPatchOffersThreads = Partial<IPostOffersThreads>

export interface IResponseOffersThreads {
    id: number
    parentId?: number | null
    offerId: number
    enabled: boolean
    created: Date
    updated: Date
}

export interface IServiceOffersThreads {
    route: string
    post(
        value: IPostOffersThreads,
    ): Promise<IReturnData<IResponseOffersThreads>>
    get(value?: IQueries): Promise<IReturnData<IResponseOffersThreads[]>>
    patch(
        value: IPatchOffersThreads,
        id: number | string,
    ): Promise<IReturnData<IResponseOffersThreads>>
    getId(id: number | string): Promise<IReturnData<IResponseOffersThreads>>
    delete(id: number | string): Promise<IReturnData<IResponseOffersThreads>>
}

interface IQueries {
    user?: number
    target?: number
    status?: string
    provider?: TTypeProvider
    offer?: number
}
