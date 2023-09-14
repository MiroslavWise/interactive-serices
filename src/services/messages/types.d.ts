import type { IReturnData } from "../types/general"


export interface IRequestPostMessages{
    threadId: number
    message: string
    parentId?: number | undefined
    emitterId: number
    receiverIds: number[]
    enabled?: boolean
    created: Date | string
}

export interface IResponseCreate{
    id: number
}

export type IRequestPatchMessages = Partial<IRequestPostMessages>

export interface IResponseMessageProps{
    id: number
    message: string
    parentId: number | null
    threadId: number
    emitterId: number
    receiverIds: number[]
}

export interface IResponseMessage extends IResponseMessageProps{
    enabled?: boolean
    created?: Date | string
    updated?: Date | string
}

export interface IMessages{
    private route: string
    public post(value: IRequestPostMessages): Promise<IReturnData<IResponseCreate>>
    public getAll(value: Record<string, any>): Promise<IReturnData<IResponseMessage[]>>
    public patch(value: IRequestPatchMessages, id: number | string): Promise<IReturnData<IResponseCreate>>
    public getId(id: number | string): Promise<IReturnData<IResponseMessage>>
    public delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    public getUserQuery(id: number | string): Promise<IReturnData<IResponseMessage[]>>
}