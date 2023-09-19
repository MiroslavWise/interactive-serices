import type { IReturnData } from "../types/general"

export interface IResponseCreate{
    id: number
}

export interface IPostOffers{
    parentId?: number
    categoryId?: number
    addresses?: number[]
    subscribers?: number[]
    provider: string
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
}

export type IPatchOffers =  Partial<IPostOffers>

export interface IResponseOffers{
    id: number
    parentId?: number
    categoryId?: number
    provider: string
    title: string
    slug: string
    description?: string
    content?: string
    imageId?: number | null
    featuredId?: number
    bannerId?: number | null
    userId?: number
}

export interface IOffers {
    private route: string
    public post(value: IPostOffers): Promise<IReturnData<IResponseCreate>>
    public get(value: Record<string, string | number>): Promise<IReturnData<IResponseOffers[]>>
    public patch(value: IPatchOffers, id: number | string): Promise<IReturnData<IResponseCreate>>
    public getId(id: number | string): Promise<IReturnData<IResponseOffers>>
    public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
}