import type { IReturnData, TProviderOffer } from "../types/general"

export interface IResponseOffersCategories{
    id: number
    provider: TProviderOffer
    title: string
    slug: string
    description: string | null
    content: string | null
}

export interface IOffersCategories{
    private route: string
    // public post(value: IPostOffers): Promise<IReturnData<IResponseCreate>>
    public getAll(value?: Record<string, string | number>): Promise<IReturnData<IResponseOffersCategories[]>>
    // public patch(value: IPatchOffers, id: number | string): Promise<IReturnData<IResponseCreate>>
    public get(id: number | string): Promise<IReturnData<IResponseOffersCategories>>
    // public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
}