import type { IReturnData } from "@/services/types/general"
import type { IGetProfileIdResponse } from "../profile/types/profileService"
import { IAddressesResponse } from "../addresses/types/serviceAddresses"

export interface IPostDataFriends {
    id: number
}

export type TPatchDataFriends = Partial<IPostDataFriends>

export interface IFriendsResponse {
    id: number
    email: string
    profile: IGetProfileIdResponse
    addresses: IAddressesResponse[]
    created: Date
    updated: Date
}

interface IQueries {
    order?: "ASC" | "DESC"
}

export interface IFriendsService {
    route: string
    get(values?: IQueries): Promise<IReturnData<IFriendsResponse[]>>
    post(value: IPostDataFriends): Promise<IReturnData<IFriendsResponse>>
    delete(id: number | string): Promise<IReturnData<{ id: number }>>
}
