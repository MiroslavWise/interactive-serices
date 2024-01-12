import type { IImageData } from "@/store/types/useAuthState"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"
import type { TTypeProvider } from "../file-upload/types"
import type { IReturnData, TOrder } from "../types/general"
import { IGetProfileIdResponse } from "../profile/types/profileService"

export interface IResponseCreate {
    id: number
}

export interface IPostOffers {
    parentId?: number
    categoryId?: number
    addresses?: number[]
    subscribers?: number[]
    provider: TTypeProvider
    title: string
    slug: string
    description?: string
    content?: string
    imageId?: number | null
    featuredId?: number | null
    bannerId?: number | null
    orderBy?: number
    createdById?: number
    updatedById?: number
    enabled: boolean
    desired: boolean
    images?: number[]
}

export type IPatchOffers = Partial<IPostOffers> & { categories?: number[] }

export interface IResponseOffers {
    id: number
    parentId?: number
    categoryId?: number
    provider: TTypeProvider
    title: string
    slug: string
    description?: string
    content?: string
    imageId?: number | null
    featuredId?: number
    bannerId?: number | null
    userId?: number
    categories: number[]
    addresses: IAddressesResponse[]
    images: IImageData[]
    updated: Date
}

export interface IQueriesOffers {
    category?: string
    order?: TOrder
    user?: number
    provider?: TTypeProvider
}

export interface IServiceOffers {
    route: string
    post(value: IPostOffers): Promise<IReturnData<IResponseCreate>>
    get(value?: IQueriesOffers): Promise<IReturnData<IResponseOffers[]>>
    patch(value: IPatchOffers, id: number | string): Promise<IReturnData<IResponseCreate>>
    getId(id: number | string): Promise<IReturnData<IResponseOffers>>
    delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    getUserId(id: number, value?: IQueriesOffers): Promise<IReturnData<IResponseOffers[]>>
}
