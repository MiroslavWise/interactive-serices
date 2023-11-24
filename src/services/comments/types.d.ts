import type { IReturnData } from "@/services/types/general"

export type TTypeStatusComments = "published" | "create"

export interface ICommentsResponse {
    id: number
    parentId: number | null
    userId: number
    offerThreadId?: number
    barterThreadId?: number
    message: string
    status: TTypeStatusComments
    enabled: boolean
    created?: Date
    updated?: Date
}

export interface IPostDataComment {
    parentId?: number | null
    userId: number
    offerThreadId?: number
    barterThreadId?: number
    message: string
    status: string
    enabled: boolean
}

export type IPatchDataComment = Partial<IPostDataComment>

interface IQueries {
    user?: number
    status?: TTypeStatusComments
    barter?: number
    offer?: number
    target?: number
}

export interface ICommentsService {
    route: string
    get(values?: IQueries): Promise<IReturnData<ICommentsResponse[]>>
    getId(id: string | number): Promise<IReturnData<ICommentsResponse>>
    post(value: IPostDataComment): Promise<IReturnData<ICommentsResponse>>
    patch(
        value: IPatchDataComment,
        id: number | string,
    ): Promise<IReturnData<ICommentsResponse>>
    delete(id: number | string): Promise<IReturnData<ICommentsResponse>>
}
