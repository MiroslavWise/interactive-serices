import type { TTypeProvider, TTypeStatusBarter } from "@/services/file-upload/types"
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
    parentId?: number
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
    categories: number[]
}

export interface IBarterResponse {
    id: number
    threadId?: number
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
    provider: TTypeProvider //всегда "barter"
    title: string
    imageId?: number | null
    orderBy?: number
    initialId: number
    consignedId: number
    updatedById?: number
    status: TTypeStatusBarter // для отслеживания статуса бартера: инициирован, отказан, принят, завершён, не состоялся
    timestamp?: Date | string
    enabled: boolean
}

interface IQueries {
    status?: TTypeStatusBarter
    user?: number
    order?: "ASC" | "DESC"
    [key: string]: any
}

export type IPatchDataBarter = Partial<IPostDataBarter>

export interface IBartersService {
    route: string
    get(values?: IQueries): Promise<IReturnData<IBarterResponse[]>>
    getId(id: string | number): Promise<IReturnData<IBarterResponse>>
    getUserId(id: string | number, values?: IQueries): Promise<IReturnData<IBarterResponse[]>>
    getReceiverId(id: string | number, values?: IQueries): Promise<IReturnData<IBarterResponse[]>>
    post(value: IPostDataBarter): Promise<IReturnData<IBarterResponse>>
    patch(value: IPatchDataBarter, id: number | string): Promise<IReturnData<IBarterResponse>>
    delete(id: number | string): Promise<IReturnData<IBarterResponse>>
}
