import type { IReturnData } from "@/services/types/general"

export interface IAddressesResponse {
    id: number
    userId: number
    address_type: string
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

type TAddressType = "main"
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
}

export interface IPatchAddress extends IPostAddress{ }

export interface IResponseAddresses{
    private route: string
    public async getAddresses(value: Record<string, string | number>): Promise<IReturnData<IAddressesResponse[]>>
    public async getAddressId(id: string | number): Promise<IReturnData<IAddressesResponse>>
    public async postAddress(value: IPostDataUser): Promise<IReturnData<IAddressesResponse>>
    public async patchAddress(value: IPostAddress, id: number | string): Promise<IReturnData<IAddressesResponse>>
    public async deleteAddress(id: number | string): Promise<IReturnData<IAddressesResponse>>
}