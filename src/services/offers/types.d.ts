import type { IImageData } from "@/store/types/useAuthState"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"
import type { TTypeProvider } from "../file-upload/types"
import type { IReturnData } from "../types/general"

export interface IResponseCreate{
    id: number
}

export interface IPostOffers{
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
    userId: number
    orderBy?: number
    createdById?: number
    updatedById?: number
    enabled: boolean
    desired: boolean
    images?: number[]
}

export type IPatchOffers =  Partial<IPostOffers>

export interface IResponseOffers{
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
    addresses: IAddressesResponse[]
    images: IImageData[]
    updated: Date
}

export interface IServiceOffers {
    private route: string
    public post(value: IPostOffers): Promise<IReturnData<IResponseCreate>>
    public get(value?: Record<string, string | number>): Promise<IReturnData<IResponseOffers[]>>
    public patch(value: IPatchOffers, id: number | string): Promise<IReturnData<IResponseCreate>>
    public getId(id: number | string): Promise<IReturnData<IResponseOffers>>
    public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    public getUserId(id: number): Promise<IReturnData<IResponseOffers>>
}