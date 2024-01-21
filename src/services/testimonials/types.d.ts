import type { TTypeProvider } from "../file-upload/types"
import type { IReturnData } from "../types/general"

export type TStatusFeedback = "published" | "blocked" | "edited"
export type TNumberRating = 1|2|3|4|5|6|7|8|9|10

export interface IPostTestimonials {
    targetId: number
    provider: TTypeProvider
    rating: TNumberRating
    barterId?: number
    message: string
    status: TStatusFeedback
    enabled: boolean
}

export type TPatchTestimonials = Partial<IPostTestimonials>

export interface IResponseTestimonials {
    id: number
    userId: number
    targetId: number
    provider: TTypeProvider
    barterId?: number
    rating: TNumberRating //1-10
    message: string
    status: TStatusFeedback
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
    status?: TStatusFeedback
    barter?: number
    offer?: number
}
