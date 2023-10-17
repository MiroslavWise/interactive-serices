import type { TTypeProvider } from "../file-upload/types"
import type { IReturnData } from "../types/general"

export interface IPostTestimonials {
    userId: number
    targetId: number
    provider: TTypeProvider
    rating: string
    message: string
    status: "published" | string
    enabled: boolean
}

export type TPatchTestimonials = Partial<IPostTestimonials>

export interface IResponseTestimonials {
    id: number
    userId: number
    targetId: number
    provider: TTypeProvider
    rating: string
    message: string
    status: "published" | string
    enabled: boolean
    created: Date
    updated: Date
}

export interface IServiceTestimonials {
    route: string
    get(value?: IQueries): Promise<IReturnData<IResponseTestimonials[]>>
    post(value: IPostTestimonials): Promise<IReturnData<IResponseTestimonials>>
    patch(
        value: TPatchTestimonials,
        id: number | string,
    ): Promise<IReturnData<IResponseTestimonials>>
    getId(id: number | string): Promise<IReturnData<IResponseTestimonials>>
    delete(id: number | string): Promise<IReturnData<IResponseTestimonials>>
}

interface IQueries {
    provider?: TTypeProvider
    user?: number
    target?: number
    status?: string
    barter?: number
    offer?: number
}
