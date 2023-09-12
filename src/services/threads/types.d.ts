import type { IReturnData } from "../types/general"

export interface IPostThreads {
    title: string
    parentId: number
    emitterId: number
    receiverIds: number[]
    enabled?: boolean
}
//Partial

export type IPatchThreads = Partial<IPostThreads>

export interface IThreadsMessages{
    id: number
    created: Date
    message: string
    emitterId: number
}

export interface IResponseThreads{
    id: number //id thread
    title: string
    parentId: number
    emitterId: number
    receiverIds: number[]
    messages: IThreadsMessages[]
}

export interface IResponseCreate{
    id: number
}

export interface IResponseThread{
    id: number
    title: string
    parentId?: number
    emitterId: number
    receiverIds: number[]
    enabled: boolean
    created: Date | string
    updated: Date | string
    messages: IThreadsMessages[]
}

export interface IThreads{
    private route: string
    public post(value: IPostThreads): Promise<IReturnData<IResponseCreate>>
    public getAll(value: Record<string, string | number>): Promise<IReturnData<IResponseThreads[]>>
    public patch(value: IPatchThreads, id: number | string): Promise<IReturnData<IResponseCreate>>
    public get(id: number | string): Promise<IReturnData<IResponseThread>>
    public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    public getUserQuery(userId: number | string): Promise<IReturnData<IResponseThreads[]>>
}