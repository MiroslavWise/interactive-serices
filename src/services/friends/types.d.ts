import type { IReturnData } from "@/services/types/general"
import type { IGetProfileIdResponse } from "../profile/types/profileService"
import { IAddressesResponse } from "../addresses/types/serviceAddresses"
import { TTypeFriends } from "@/store/types/createDroverFriends"

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

export interface IFriendResponseId {
    created: Date
    email: string
    id: string
}

interface IQueries {
    order?: "ASC" | "DESC"
    filter?: Exclude<TTypeFriends, "list">
}

export interface IFriendsService {
    route: string
    get(values?: IQueries): Promise<IReturnData<IFriendsResponse[]>>
    getId(id: number | string): Promise<IReturnData<IFriendResponseId[]>>
    post(value: IPostDataFriends): Promise<IReturnData<IFriendsResponse>>
    delete(id: number | string): Promise<IReturnData<{ id: number }>>
}
