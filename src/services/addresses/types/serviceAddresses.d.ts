import type { IReturnData } from "@/services/types/general"

export interface IAddressesResponse {
    id: number
    userId: number
    addressType: string
    country: string
    region?: string
    district?: string
    city?: string
    zip?: number
    street?: string
    house?: string
    block?: string
    apartments?: string
    coordinates: string
    additional: string
    enabled: boolean
    created: Date
    updated: Date
}

type TAddressType = "main" | any
export interface IPostAddress {
    addressType: TAddressType
    country?: string
    region?: string
    district?: string
    city?: string
    zip?: number
    street?: string
    house?: string
    block?: string
    apartments?: string
    coordinates?: string
    additional?: string
    enabled?: boolean
    hash?: string
    longitude?: string //долгота
    latitude?: string //широта (не может быть больше 90)
}

export type IPatchAddress = Partial<IPostAddress>

export interface IServiceAddresses {
    route: string
    get(
        value: Record<string, string | number>,
    ): Promise<IReturnData<IAddressesResponse[]>>
    getHash(value: string): Promise<IReturnData<IAddressesResponse>>
    getId(id: string | number): Promise<IReturnData<IAddressesResponse>>
    post(value: IPostAddress): Promise<IReturnData<{ id: number }>>
    patch(
        value: IPatchAddress,
        id: number | string,
    ): Promise<IReturnData<IAddressesResponse>>
    delete(id: number | string): Promise<IReturnData<IAddressesResponse>>
}
