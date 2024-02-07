import type { IPromiseReturn } from "@/services/types/general"
import type { IGetProfileIdResponse } from "../profile/types"
import type { IAddressesResponse } from "../addresses/types/serviceAddresses"
import type { TTypeFriends } from "@/store/types/createDroverFriends"

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
  id: number
}

interface IQueries {
  order?: "ASC" | "DESC"
  filter?: Exclude<TTypeFriends, "list">
}

export interface IFriendsService {
  get(values?: IQueries): IPromiseReturn<IFriendsResponse[]>
  getId(id: number | string): IPromiseReturn<IFriendResponseId[]>
  post(value: IPostDataFriends): IPromiseReturn<IFriendsResponse>
  delete(id: number | string): IPromiseReturn<{ id: number }>
}
