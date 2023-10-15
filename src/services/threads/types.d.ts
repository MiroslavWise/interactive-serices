import type { IReturnData } from "../types/general"

export type TTypeProviderThreads = "personal" | "barter"

export interface IPostThreads {
    title: string
    parentId?: number
    emitterId: number
    receiverIds: number[]
    provider: string
    barterId?: number
    enabled?: boolean
}
//Partial

//personal | barter

export type IPatchThreads = Partial<IPostThreads>

export interface IThreadsMessages {
    id: number
    created: Date
    message: string
    emitterId: number
}

export interface IResponseThreads {
    id: number //id thread
    title: string
    parentId: number
    emitterId: number
    receiverIds: number[]
    provider: string
    barterId?: number
    messages: IThreadsMessages[]
}

export interface IResponseCreate {
    id: number
}

export interface IResponseThread {
    id: number
    title: string
    parentId?: number
    emitterId: number
    receiverIds: number[]
    enabled: boolean
    provider: string
    barterId?: number
    created: Date | string
    updated: Date | string
    messages: IThreadsMessages[]
}

interface IQueryParams {
    user?: number | string
    provider?: TTypeProviderThreads
    [key: string]: any
}

export interface IServiceThreads {
    route: string
    post(value: IPostThreads): Promise<IReturnData<IResponseCreate>>
    get(value?: IQueryParams): Promise<IReturnData<IResponseThreads[]>>
    patch(
        value: IPatchThreads,
        id: number | string,
    ): Promise<IReturnData<IResponseCreate>>
    getId(id: number | string): Promise<IReturnData<IResponseThread>>
    delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    getUserId(userId: number | string): Promise<IReturnData<IResponseThreads[]>>
}
