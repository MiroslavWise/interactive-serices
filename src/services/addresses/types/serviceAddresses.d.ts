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
export interface IPostAddress{
    userId: number
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
}

export type IPatchAddress = Partial<IPostAddress>

export interface IServiceAddresses{
    private route: string
    public get(value: Record<string, string | number>): Promise<IReturnData<IAddressesResponse[]>>
    public getId(id: string | number): Promise<IReturnData<IAddressesResponse>>
    public post(value: IPostDataUser): Promise<IReturnData<{id: number}>>
    public patch(value: IPostAddress, id: number | string): Promise<IReturnData<IAddressesResponse>>
    public delete(id: number | string): Promise<IReturnData<IAddressesResponse>>
}