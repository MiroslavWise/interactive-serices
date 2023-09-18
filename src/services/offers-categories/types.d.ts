import type { IReturnData, TProviderOffer } from "../types/general"

export interface IResponseOffersCategories{
    id: number
    provider: TProviderOffer
    title: string
    slug: string
    description: string | null
    content: string | null
}

export interface IServiceOffersCategories{
    private route: string
    // public post(value: IPostOffers): Promise<IReturnData<IResponseCreate>>
    public get(value?: Record<string, string | number>): Promise<IReturnData<IResponseOffersCategories[]>>
    // public patch(value: IPatchOffers, id: number | string): Promise<IReturnData<IResponseCreate>>
    public getId(id: number | string): Promise<IReturnData<IResponseOffersCategories>>
    // public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
}