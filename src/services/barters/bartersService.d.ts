import type {
    TTypeProvider,
    TTypeStatusBarter,
} from "@/services/file-upload/types"
import type { IReturnData } from "@/services/types/general"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"

export interface ISmallThread {
    id: number
    title: string
    parentId: number | null
    emitterId: number
    provider: TTypeProvider
}

export interface ISmallDataOfferBarter {
    id: number
    parentId: number | null
    provider: TTypeProvider
    title: string
    slug: string
    description: string | null
    content: string | null
    categoryId: number
    created: Date
    updated: Date
    userId: number
    subscribers: number[]
    images: any[]
    addresses: IAddressesResponse[]
}

export interface IBarterResponse {
    id: number
    thread?: ISmallThread
    parentId: number | null
    consignedId: number // принимающий оффер
    initialId: number //инициализирующий оффер
    title: string
    imageId: number | null
    userId: number | null
    updatedById: number | null
    provider: TTypeProvider
    created: Date
    updated: Date
    timestamp: Date
    status: TTypeStatusBarter
    initiator: ISmallDataOfferBarter
    consigner: ISmallDataOfferBarter
}

export interface IPostDataBarter {
    parentId?: number
    categoryId?: number
    threadId?: number
    addresses?: number[]
    subscribers?: number[]
    provider: TTypeProvider
    title: string
    imageId?: number | null
    userId?: number
    orderBy?: number
    initialId: number
    consignedId: number
    updatedById?: number
    status: TTypeStatusBarter
    timestamp?: Date | string
    enabled: boolean
}

interface IQueries {
    status?: TTypeStatusBarter
    user?: number
    [key: string]: any
}

export type IPatchDataBarter = Partial<IPostDataBarter>

export interface IBartersService {
    route: string
    get(values?: IQueries): Promise<IReturnData<IBarterResponse[]>>
    getId(id: string | number): Promise<IReturnData<IBarterResponse>>
    getUserId(
        id: string | number,
        values?: IQueries,
    ): Promise<IReturnData<IBarterResponse[]>>
    getReceiverId(
        id: string | number,
        values?: IQueries,
    ): Promise<IReturnData<IBarterResponse[]>>
    post(value: IPostDataBarter): Promise<IReturnData<IBarterResponse>>
    patch(
        value: IPatchDataBarter,
        id: number | string,
    ): Promise<IReturnData<IBarterResponse>>
    delete(id: number | string): Promise<IReturnData<IBarterResponse>>
}
