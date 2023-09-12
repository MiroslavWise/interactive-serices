import type { UUID } from "crypto"

interface IMetaData {
    page: number
    limit: number
    total: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    time: string
    requestId: UUID
}

export interface IReturnData<T> {
    ok: boolean
    error?: any | null
    res?: T | null
    code?: number
    meta?: IMetaData
}

export type TProviderOffer =
    | "main"
    | "beauty"
    | "pets"
    | "studying"
    | "transport"
    | "housework"
    | "appliances"
    | "social"
    | "children"
    | "games"
    | "rent"
