import type { IReturnData } from "../types/general"

export type TProviderLikes = "offer" | "user"

export interface IPostDataLikes {
    id: number
    provider: TProviderLikes
}

export interface IResponseLikes {
    created: Date
    id: number
    provider: TProviderLikes
    userId: number
}

export interface ILikesService {
    route: string
    post(value: IPostDataLikes): Promise<IReturnData<{}>>
    get(): Promise<IReturnData<IResponseLikes[]>>
    getTargetId(
        provider: TProviderLikes,
        id: number,
    ): Promise<IReturnData<number>>
}
