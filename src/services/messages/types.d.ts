import { IImageData } from "@/store/types/useAuthState"
import type { IReturnData } from "../types/general"

export interface IRequestPostMessages {
    threadId: number
    message: string
    parentId?: number | undefined | null
    emitterId: number
    receiverIds: number[]
    enabled?: boolean
    created: Date | string
}

export interface IResponseCreate {
    id: number
}

export type IRequestPatchMessages = Partial<IRequestPostMessages>

export interface IResponseMessageProps {
    id: number
    message: string
    parentId: number | null
    threadId: number
    emitterId: number
    receiverIds: number[]
    images: IImageData[] | string[]
    readIds: number[]
}

export interface IResponseMessage extends IResponseMessageProps {
    enabled?: boolean
    created?: Date | string
    updated?: Date | string
}

export interface IMessages {
    route: string
    post(value: IRequestPostMessages): Promise<IReturnData<IResponseCreate>>
    postRead(id: number): Promise<IReturnData<IResponseCreate>>
    get(value: Record<string, any>): Promise<IReturnData<IResponseMessage[]>>
    patch(value: IRequestPatchMessages, id: number | string): Promise<IReturnData<IResponseCreate>>
    getId(id: number | string): Promise<IReturnData<IResponseMessage>>
    delete(id: number | string): Promise<IReturnData<IResponseCreate>>
    getUserId(id: number | string): Promise<IReturnData<IResponseMessage[]>>
}
